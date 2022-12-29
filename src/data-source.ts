import 'reflect-metadata'
import { DataSource } from "typeorm";
import { Config } from './config';

const port = Config.DATABASE.PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Config.DATABASE.HOST,
    port: port,
    username: Config.DATABASE.USERNAME,
    password: Config.DATABASE.PASSWORD,
    database: Config.DATABASE.DATABASE,
    entities: [`${__dirname}/**/entities/*.{ts,js}`], // Buscar qualquer arquivo dentro de qualquer pasta entities
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`], // Buscar qualquer arquivo dentro de qualquer pasta migrations
})