import env from 'dotenv';
import path from 'path';

env.config({
  path: path.join(__dirname, `../../env/.env`),
});

export const Config = {
  SERVER_PORT: Number(process.env.SERVER_PORT),
  DATABASE: {
    HOST: process.env.DB_HOST ?? 'localhost',
    DATABASE: process.env.DB_NAME ?? 'postgres',
    USERNAME: process.env.DB_USER ?? 'postgres',
    PASSWORD: process.env.DB_PASS ?? 'example',
    PORT: Number(process.env.DB_PORT ?? 5432),
  },
};
