import { IProducerRabbitMQ } from "@usecases/port/service/producer-rabbit-mq";
import { IStudentPresenceService } from "@usecases/port/service/student-presence-service";
import { inject, injectable } from "tsyringe";
import { IStudentPresenceServicePayload } from "./domain/student-presence-service-payload";

@injectable()
class StudentPresenceService implements IStudentPresenceService {

    constructor(
        @inject('ProducerRabbitMQ')
        private producerRabbitMQ: IProducerRabbitMQ,
    ) {

    }

    async execute(id: number, date: Date, presence: boolean): Promise<boolean> {
        const payload: IStudentPresenceServicePayload = { id, date, presence };
        const sentPresenceStudent = await this.producerRabbitMQ.publishMessage(
            'exchange-student-presence-create', 
            'routing-key-queue-student-presence-create', 
            payload
        );
        return sentPresenceStudent;
    }
}

export { StudentPresenceService };