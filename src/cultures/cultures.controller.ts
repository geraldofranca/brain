import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CulturesService } from './cultures.service';
import { CreateCultureDto } from './dto/create-culture.dto';

@Controller('cultures')
export class CulturesController {
  constructor(private readonly culturesService: CulturesService) {}

  @Post()
  create(@Body(ValidationPipe) createCultureDto: CreateCultureDto) {
    return this.culturesService.create(createCultureDto);
  }

}
