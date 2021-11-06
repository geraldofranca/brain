import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerRepository } from './producers.repository';
import { ProducersService } from './producers.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerRepository])],
  providers: [ProducersService]
})
export class ProducersModule {}
