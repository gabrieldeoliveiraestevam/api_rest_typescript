import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/entities/*.{ts,js}`], // Buscar qualquer arquivo dentro de qualquer pasta entities
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`], // Buscar qualquer arquivo dentro de qualquer pasta migrations
//     synchronize: true,
//     logging: true,
//     subscribers: [],
})