import { Config } from '@config/index';
import { injectable } from 'tsyringe';
import amqp, {
    AmqpConnectionManager,
    Channel,
    Options,
} from 'amqp-connection-manager';

@injectable()
class AMQPService {
    private connection: AmqpConnectionManager;
    private channel: Channel;

    private readonly assertExchangeOptions: Options.AssertExchange = {
        durable: true,
        autoDelete: false,
    };

    constructor() {
        this.setup();
    }

    private setup(): void {
        this.connection = amqp.connect(Config.RABBITMQ.URI, {
            connectionOptions: {
                clientProperties: {
                    connection_name: 'api-rest-typescript.api',
                },
            },
        });

        this.channel = this.connection.createChannel({
            setup: async (channel: Channel) => {
                console.log(
                    'Conectado ao RabbitMQ. Realizando configurações das exchanges e filas.',
                );
                await this.setupQueuesAndExchanges(channel);
            },
        });
    }

    private async setupQueuesAndExchanges(channel: Channel): Promise<void> {
        channel.assertExchange(
            'exchange-student-grade',
            'direct',
            this.assertExchangeOptions,
        );
        console.log('Configuração de exchange e filas finalizada');
    }

    getConnection<TConnection>(): TConnection {
        return this.connection as unknown as TConnection;
    }
};

export { AMQPService };
