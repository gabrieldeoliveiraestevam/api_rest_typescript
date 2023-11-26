import { failure, succes } from "@usecases/errors/either";
import { StudentNotExistError } from "@usecases/errors/student-not-exist-error";
import { StudentPresenceNotSentError } from "@usecases/errors/student-presence-not-sent-error";
import { IStudentRepository } from "@usecases/port/repositories/student-repository";
import { IStudentPresenceService } from "@usecases/port/service/student-presence-service";
import { inject, injectable } from "tsyringe";
import { IStudentPresenceRequest } from "./domain/student-presence-request";
import { IStudentPresenceResponse } from "./domain/student-presence-response";

@injectable()
export class StudentPresenceUseCase {
    constructor(
        @inject("StudentRepositoryTypeOrm")
        private studentRepository: IStudentRepository,
        @inject("StudentPresenceService")
        private studentPresenceService: IStudentPresenceService,
    ){

    }
    async execute(data: IStudentPresenceRequest): Promise<IStudentPresenceResponse> { 

        try {
            const studentExist = await this.studentRepository.findOneById(data.id);

            if (studentExist) {
                const sentPresenceStudent = await this.studentPresenceService.execute(
                    data.id,
                    new Date(data.date),
                    data.presence,
                );

                if(!sentPresenceStudent){
                    return failure(new StudentPresenceNotSentError());
                }

            } else {
                return failure(new StudentNotExistError());               
            }

            return succes();
        } catch (error) {
            console.log(error);
            return failure(new Error('Error StudentPresenceUseCase'));
        }
  
    };
};