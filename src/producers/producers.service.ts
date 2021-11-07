import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CpfCnpjValidator } from '../shared/validators/cpf-cnpj-validator';
import { FindProducersQueryDto } from './dto/find-producers-query.dto';
import { ProducerDto } from './dto/producer.dto';
import { Producer } from './entities/producer.entity';
import { ProducerRepository } from './producers.repository';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(ProducerRepository)
    private producerRepository: ProducerRepository
  ) {}

  async createProducer(producerDto: ProducerDto): Promise<Producer> {
    const errors = await this.validation(producerDto, false);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return this.producerRepository.createProducer(producerDto);
  }

  async updateProducer(producerDto: ProducerDto): Promise<Producer> {
    const producerFound = await this.producerRepository.findOne({ cpf_cnpj: producerDto.cpf_cnpj });
    if (!producerFound) {
      throw new NotFoundException('Produtor não encontrado!');
    }

    const errors = await this.validation(producerDto, true);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return this.producerRepository.updateProducer(producerDto);
  }

  async removeProducer(id: string): Promise<any> {
    const producerFound = await this.producerRepository.findOne({ id });
    if (!producerFound) {
      throw new NotFoundException('Produtor não encontrado!');
    }

    return await this.producerRepository.delete({ id });
  }

  async findProducers (
    queryDto: FindProducersQueryDto,
  ): Promise<{ producers: Producer[]; total: number }> {
    const producers = await this.producerRepository.findProducers(queryDto);
    return producers;
  }

  async validation(producerDto: ProducerDto, isUpdate: Boolean) {
    const validation = [];
    const cpfCnpjValidator = new CpfCnpjValidator();
    if (!cpfCnpjValidator.isValid(producerDto.cpf_cnpj)) {
      validation.push('CPF/CNPJ Inválido!');
    }

    if (!isUpdate) {
      const producerFound = await this.producerRepository.findOne({ cpf_cnpj: producerDto.cpf_cnpj });
      if (producerFound) {
        validation.push('CPF/CNPJ já cadastrado!');
      }
    }

    if ((producerDto.planting_area + producerDto.vegetation_area) > producerDto.total_area_farm) {
      validation.push('A soma de área agricultável e de vegetação não pode ser maior que a área total da fazenda!')
    }

    return validation;
  }
}
