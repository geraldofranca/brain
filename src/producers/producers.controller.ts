import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { created, noContent, ok } from '../shared/helpers/http-helper';
import { HttpResponse } from '../shared/protocols/http';
import { ProducerDto } from './dto/producer.dto';
import { ValidationParamsPipe } from '../shared/pipes/validation-params.pipe';
import { ProducersService } from './producers.service';
import { FindProducersQueryDto } from './dto/find-producers-query.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('producers')
@Controller('producers')
export class ProducersController {
  constructor(private producersService: ProducersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria o registro do produtor' })
  @ApiResponse({ status: 201, description: 'Retorna o status 201 e o objeto criado' })
  async createProducer(@Body(ValidationPipe) producerDto: ProducerDto): Promise<HttpResponse> {
    const producer = await this.producersService.createProducer(producerDto);
    return created(producer);  
  }

  @Put()
  @ApiOperation({ summary: 'Altera o registro do produtor' })
  @ApiResponse({ status: 200, description: 'Retorna o status 200 e o objeto alterado' })
  async updateProducer(@Body(ValidationPipe) producerDto: ProducerDto): Promise<HttpResponse> {
    const producer = await this.producersService.updateProducer(producerDto);
    return ok(producer);  
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Remove o registro do produtor' })
  @ApiResponse({ status: 204, description: 'Retorna o status 204' })
  async removeProducer(@Param('id', ValidationParamsPipe) id: string): Promise<HttpResponse> {
    await this.producersService.removeProducer(id);
    return noContent();
  }

  @Get()
  @ApiOperation({ summary: 'Busca os registros por filtro' })
  @ApiResponse({ status: 200, description: 'Retorna a lista dos registros encontrados com base no filtro' })
  async findUsers(@Query() query: FindProducersQueryDto) {
    const producers = await this.producersService.findProducers(query);
    return ok(producers);  
  }
}
