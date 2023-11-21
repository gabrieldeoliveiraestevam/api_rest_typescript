import { AMQPService } from '@services/rabbitMQ/amqpService';
import consumerFactory from '@shared/factory';

export const SetupAmqpProvider = async () => {
    try {
        const amqpService = consumerFactory<AMQPService>('AMQPService');            
    } catch (error) {
        console.log(error);
    }
};