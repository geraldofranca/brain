import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { ProducersModule } from './producers/producers.module';
import { CulturesModule } from './cultures/cultures.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProducersModule, CulturesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
