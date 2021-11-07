import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { FindProducersQueryDto } from "./dto/find-producers-query.dto";
import { ProducerDto } from "./dto/producer.dto";
import { Producer } from "./entities/producer.entity";

@EntityRepository(Producer)
export class ProducerRepository extends Repository<Producer> {

  async createProducer (
    producerDto: ProducerDto
  ): Promise<Producer> {
    const { cpf_cnpj, producer_name, farm_name, city,
      state, total_area_farm, planting_area, vegetation_area } = producerDto;

    const producer = this.create();
    producer.cpf_cnpj = cpf_cnpj;
    producer.producer_name = producer_name;
    producer.farm_name = farm_name;
    producer.city = city;
    producer.state = state;
    producer.total_area_farm = total_area_farm;
    producer.planting_area = planting_area;
    producer.vegetation_area = vegetation_area;

    try {
      return await producer.save();
    } catch (error) {
        throw new InternalServerErrorException(
          'Erro ao salvar o registro do produtor',
        );
    }
  }

  async updateProducer (producerDto: ProducerDto): Promise<Producer> {
    const { cpf_cnpj, producer_name, farm_name, city,
      state, total_area_farm, planting_area, vegetation_area } = producerDto;

    const producer = await this.findOne({ cpf_cnpj: producerDto.cpf_cnpj });

    producer.cpf_cnpj = cpf_cnpj ? cpf_cnpj : producer.cpf_cnpj;
    producer.producer_name = producer_name ? producer_name : producer.producer_name;
    producer.farm_name = farm_name ? farm_name : producer.farm_name;
    producer.city = city ? city : producer.city;
    producer.state = state ? state : producer.state;
    producer.total_area_farm = total_area_farm ? total_area_farm : producer.total_area_farm;
    producer.planting_area = planting_area ? planting_area : producer.planting_area;
    producer.vegetation_area = vegetation_area ? vegetation_area : producer.vegetation_area;

    try {
      return await producer.save();
    } catch (error) {
        throw new InternalServerErrorException(
          'Erro ao alterar o registro do produtor',
        );
    }
  }

  async findProducers (
    queryDto: FindProducersQueryDto,
  ): Promise<{ producers: Producer[]; total: number }> {
    queryDto.page = queryDto.page ? queryDto.page : 1;
    queryDto.limit = queryDto.limit ? queryDto.limit : 100;

    const { producer_name, farm_name, city, state } = queryDto;
    const query = this.createQueryBuilder('producer');

    if (producer_name) {
      query.andWhere('producer.producer_name ILIKE :producer_name', { producer_name: `%${producer_name}%` });
    }

    if (farm_name) {
      query.andWhere('producer.farm_name ILIKE :farm_name', { farm_name: `%${farm_name}%` });
    }

    if (city) {
      query.andWhere('producer.city = :city', { city });
    }

    if (state) {
      query.andWhere('producer.state = :state', { state });
    }

    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(+queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);

    const [producers, total] = await query.getManyAndCount();

    return { producers, total };
  }

}
