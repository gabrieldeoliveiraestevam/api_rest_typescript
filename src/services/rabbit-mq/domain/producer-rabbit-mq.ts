export interface IProducerRabbitMQ {
    publishMessage(exchange: string, routingKey: string, message: string): Promise<boolean>;
};