import { Module } from '@nestjs/common';
import { CulturesService } from './cultures.service';
import { CulturesController } from './cultures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultureRepository } from './cultures.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CultureRepository])],
  controllers: [CulturesController],
  providers: [CulturesService]
})
export class CulturesModule {}
