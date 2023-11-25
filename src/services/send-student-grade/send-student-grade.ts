import { inject, injectable } from 'tsyringe';
import { ISendStudentGrade } from './domain/send-student-grade';
import { IProducerRabbitMQ } from '../rabbit-mq/domain/producer-rabbit-mq';

@injectable()
class SendStudentGrade implements ISendStudentGrade {

    constructor(
        @inject("ProducerRabbitMQ")
        private producer: IProducerRabbitMQ,
    ){
    }

    async execute(id: number, name: string, grade: number): Promise<boolean>{
        const message = `Aluno ${name} teve nota ${grade}`;
        return this.producer.publishMessage('exchange-student-grade', 'routing-key-queue-student-grade', message);
    }

};

export { SendStudentGrade }; 