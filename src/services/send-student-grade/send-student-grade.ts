import { IProducerRabbitMQ } from '@usecases/port/service/producer-rabbit-mq';
import { ISendStudentGrade } from '@usecases/port/service/send-student-grade';
import { inject, injectable } from 'tsyringe';

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