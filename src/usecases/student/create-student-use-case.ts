import { failure, succes } from "@usecases/errors/either";
import { IStudentRepository } from "@usecases/port/repositories/student-repository";
import { inject, injectable } from "tsyringe";
import { ICreateStudentRequest } from "./domain/create-student-request";
import { ICreateStudentResponse } from "./domain/create-student-response";

@injectable()
export class CreateStudentUseCase {
    constructor(
        @inject("StudentRepositoryTypeOrm")
        private studentRepository: IStudentRepository,
    ){

    }
    async execute(data: ICreateStudentRequest): Promise<ICreateStudentResponse> { 

        try {
            
            const birth_date_object = new Date(data.birth_date);

            const student = this.studentRepository.create(
                data.name,
                birth_date_object,
                data.email,
            );

            await this.studentRepository.save(student);

            // Retira envio de email temporariamente - bloqueio de conta outlook
            // await this.sendEmail.execute(student.email, student.name);
            
            return succes(student);
        } catch (error) {
            console.log(error);
            return failure(new Error('Error CreateStudentUseCase'));
        }
  
    };
};