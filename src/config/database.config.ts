import { DataSource } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PORT, DB_PWD, DB_USR } from './env.config.js';
import { UserSchema } from '../resources/v1/user/entities/user.entity.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USR,
  password: DB_PWD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    __dirname + '/common/entities/**/*{.ts,.js}', 
    UserSchema,
  ],
  migrations: [],
  subscribers: [],
});
