import { IStudentRepository } from "@usecases/port/repositories/student-repository";
import { IStudentPresenceService } from "@usecases/port/service/student-presence-service";
import { inject, injectable } from "tsyringe";
import { IStudentPresenceRequest } from "./domain/student-presence-request";

@injectable()
export class StudentPresenceUseCase {
    constructor(
        @inject("StudentRepositoryTypeOrm")
        private studentRepository: IStudentRepository,
        @inject("StudentPresenceService")
        private studentPresenceService: IStudentPresenceService,
    ){

    }
    async execute(data: IStudentPresenceRequest): Promise<void> { 

        try {
            const studentExist = await this.studentRepository.findOneById(data.id);

            if (studentExist) {
                const sentPresenceStudent = await this.studentPresenceService.execute(
                    data.id,
                    new Date(data.date),
                    data.presence,
                );

                if(!sentPresenceStudent){
                    throw new Error('Student presence was not sent'); 
                }

            } else {
                throw new Error('Student not exist');                
            }
        } catch (error) {
            console.log(error);
            throw new Error('Error StudentPresenceUseCase');
        }
  
    };
};