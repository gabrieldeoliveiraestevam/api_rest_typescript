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
    PASSWORD: process.env.DB_PASS ?? 'postgres',
    PORT: Number(process.env.DB_PORT ?? 5432),
  },
  EMAIL_OUTLOOK: {
    HOST: process.env.EMAIL_OUTLOOK_HOST,
    PORT: process.env.EMAIL_OUTLOOK_PORT,
    USER: process.env.EMAIL_OUTLOOK_USER,
    PASS: process.env.EMAIL_OUTLOOK_PASS,
  },
  RABBITMQ: {
    URI: process.env.URI_RABBITMQ ?? 'amqp://guest:guest@localhost:5672',
  },
  JWT: {
    PASSWORD: process.env.JWT_PASSWORD ?? "",
  }
};