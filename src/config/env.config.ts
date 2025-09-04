import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

assert(process.env.PORT, 'Variable de entorno PORT no definida!');
assert(process.env.DB_HOST, 'Variable de entorno DB_HOST no definida!');
assert(process.env.DB_PORT, 'Variable de entorno DB_PORT no definida!');
assert(process.env.DB_USR, 'Variable de entorno DB_USR no definida!');
assert(process.env.DB_PWD, 'Variable de entorno DB_PWD no definida!');
assert(process.env.DB_NAME, 'Variable de entorno DB_NAME no definida!');
assert(process.env.JWT_SECRET, 'Variable de entorno JWT_SECRET no definida!');

export const PORT = +process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = +process.env.DB_PORT;
export const DB_USR = process.env.DB_USR;
export const DB_PWD = process.env.DB_PWD;
export const DB_NAME = process.env.DB_NAME;
export const JWT_SECRET = process.env.JWT_SECRET;
