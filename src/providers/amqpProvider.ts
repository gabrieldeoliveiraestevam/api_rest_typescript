import { AMQPService } from '@services/rabbitMQ/amqpService';
import consumerFactory from '@shared/factory';

export const SetupAmqpProvider = async () => {
    try {
        consumerFactory<AMQPService>('AMQPService');
    } catch (error) {
        console.log(error);
    }
};
