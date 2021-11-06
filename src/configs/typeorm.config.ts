import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5454,
  username: 'pguser',
  password: 'pgpassword',
  database: 'solucao-legal',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};