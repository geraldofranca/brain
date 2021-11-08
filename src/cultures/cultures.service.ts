import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CultureRepository } from './cultures.repository';
import { CreateCultureDto } from './dto/create-culture.dto';

@Injectable()
export class CulturesService {
  constructor(
    @InjectRepository(CultureRepository)
    private repository: CultureRepository
  ) {}

  create(createCultureDto: CreateCultureDto) {
    return this.repository.createCulture(createCultureDto);
  }
  
}
