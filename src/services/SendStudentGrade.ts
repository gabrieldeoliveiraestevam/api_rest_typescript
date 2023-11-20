import { inject, injectable } from 'tsyringe';
import { Connection, Channel, connect} from 'amqplib';
import { IRabbitMQ } from './domain/IRabbitMQ';
import { RabbitMQ } from './RabbitMQ';
var amqp = require('amqplib');

@injectable()
class SendStudentGrade {

    constructor(
        @inject("RabbitMQ")
        private rabbitMQ: IRabbitMQ,
    ){
    }

    async publish(exchange: string, routingKey: string, message: string): Promise<boolean>{
        return this.rabbitMQ.channel.publish(exchange, routingKey, Buffer.from(message));
    }

};

export { SendStudentGrade }; 