import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { created, noContent, ok } from '../shared/helpers/http-helper';
import { HttpResponse } from '../shared/protocols/http';
import { ProducerDto } from './dto/producer.dto';
import { ValidationParamsPipe } from '../shared/pipes/validation-params.pipe';
import { ProducersService } from './producers.service';
import { FindProducersQueryDto } from './dto/find-producers-query.dto';

@Controller('producers')
export class ProducersController {
  constructor(private producersService: ProducersService) {}

  @Post()
  async createProducer(@Body(ValidationPipe) producerDto: ProducerDto): Promise<HttpResponse> {
    const producer = await this.producersService.createProducer(producerDto);
    return created(producer);  
  }

  @Put()
  async updateProducer(@Body(ValidationPipe) producerDto: ProducerDto): Promise<HttpResponse> {
    const producer = await this.producersService.updateProducer(producerDto);
    return ok(producer);  
  }

  @Delete('/:id')
  async removeProducer(@Param('id', ValidationParamsPipe) id: string): Promise<HttpResponse> {
    await this.producersService.removeProducer(id);
    return noContent();
  }

  @Get()
  async findUsers(@Query() query: FindProducersQueryDto) {
    const producers = await this.producersService.findProducers(query);
    return ok(producers);  
  }
}
