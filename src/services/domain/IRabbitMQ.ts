import { Connection, Channel } from 'amqplib';

export interface IRabbitMQ {
    connection: Connection;
    channel: Channel;
    setup(): Promise<void>;
};