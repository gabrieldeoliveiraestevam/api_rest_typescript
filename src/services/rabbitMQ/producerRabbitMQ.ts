import { IAmqpConnectionManager } from 'amqp-connection-manager/dist/types/AmqpConnectionManager';
import ChannelWrapper from 'amqp-connection-manager/dist/types/ChannelWrapper';
import { inject, injectable } from 'tsyringe';
import { AMQPService } from './amqpService';
import { IProducerRabbitMQ } from './domain/IProducerRabbitMQ';

@injectable()
class ProducerRabbitMQ implements IProducerRabbitMQ {
    private channel: ChannelWrapper;

    constructor(
        @inject("AMQPService")
        private amqpService: AMQPService,
    ){
        this.channel = this.amqpService.getConnection<IAmqpConnectionManager>().createChannel({
            json: true,
        });
    }

    async publishMessage(exchange: string, routingKey: string, message: string): Promise<boolean>{
        try {
            const sentToExchange = this.channel.publish(exchange, routingKey, message);

            return sentToExchange;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

};

export { ProducerRabbitMQ }; 