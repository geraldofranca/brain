import { Body, Controller, Post } from '@nestjs/common';
import { CreateProducerDto } from './create-producer.dto';
import { ProducersService } from './producers.service';

@Controller('producers')
export class ProducersController {
  constructor(private producersService: ProducersService) {}

  @Post()
  async createProducer(@Body() createProducerDto: CreateProducerDto): Promise<CreateProducerDto> {
    return await this.producersService.createProducer(createProducerDto);
  }
}
