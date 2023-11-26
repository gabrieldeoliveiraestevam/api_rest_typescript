export interface IProducerRabbitMQ {
    publishMessage(exchange: string, routingKey: string, message: any): Promise<boolean>;
};