import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProducerDto } from './create-producer.dto';
import { Producer } from './producer.entity';
import { ProducerRepository } from './producers.repository';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(ProducerRepository)
    private producerRepository: ProducerRepository,
  ) {}

  async createProducer(createProducerDto: CreateProducerDto): Promise<Producer> {
    return this.producerRepository.createProducer(createProducerDto);
  }
}
