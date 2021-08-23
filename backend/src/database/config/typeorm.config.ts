import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve, join } from 'path';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: [resolve(__dirname, '..', 'migrations', '*.{ts,js}')],
  entities: [
    resolve(__dirname, '..', 'modules', '**', 'entities', '*.entity.{ts,js}'),
  ],
  cli: {
    migrationsDir: join('src', 'database', 'migrations'),
  },
};

module.exports = options;
