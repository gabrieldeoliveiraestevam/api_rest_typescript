import { AMQPService } from '@services/rabbit-mq/amqp-service';
import consumerFactory from '@shared/factory';

export const SetupAmqpProvider = async () => {
    try {
        consumerFactory<AMQPService>('AMQPService');
    } catch (error) {
        console.log(error);
    }
};
