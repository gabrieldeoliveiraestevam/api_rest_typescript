import { Config } from '@config/index';
import { injectable } from 'tsyringe';
import { Connection, Channel, connect} from 'amqplib';
var amqp = require('amqplib');

@injectable()
class RabbitMQ {
    public connection: Connection;
    public channel: Channel;

    constructor(

    ){
        this.setup();
    }

    // Criação da conexão RabbitMQ, Canal e Exchange. Essa conexão não deveria está aqui. 
    // Na verdade, deveria está no início da execução do APP (src/index.ts)
    async setup(): Promise<void>{
        this.connection = await connect(Config.RABBITMQ.URI);
        this.channel = await this.connection.createChannel();
        this.channel.assertExchange('exchange-student-grade', 'direct', { durable: false });
        console.log('Conexão Rabbitmq OK');
    };

};

export { RabbitMQ }; 