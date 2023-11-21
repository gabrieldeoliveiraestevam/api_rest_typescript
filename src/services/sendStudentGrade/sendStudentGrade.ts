import { inject, injectable } from 'tsyringe';
import { ISendStudentGrade } from './domain/ISendStudentGrade';
import { IProducerRabbitMQ } from '../rabbitMQ/domain/IProducerRabbitMQ';

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