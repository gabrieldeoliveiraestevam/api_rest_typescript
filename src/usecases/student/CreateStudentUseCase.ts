import { ISendEmail } from "@services/domain/ISendEmail";
import { ISendStudentGrade } from "@services/domain/ISendStudentGrade";
import { IStudentRepository } from "@usecases/port/repositories/IStudentRepository";
import { inject, injectable } from "tsyringe";
import { ICreateStudentRequest } from "./domain/ICreateStudentRequest";
import { ICreateStudentResponse } from "./domain/ICreateStudentResponse";

@injectable()
export class CreateStudentUseCase {
    constructor(
        @inject("StudentRepositoryTypeOrm")
        private studentRepository: IStudentRepository,
        @inject("SendEmail")
        private sendEmail: ISendEmail,
        @inject("SendStudentGrade")
        private sendStudentGrade: ISendStudentGrade,
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
            
            // 
            await this.sendStudentGrade.publish(
                'exchange-student-grade', 
                'routing-key-queue-student-grade', 
                "Aluno " + data.name + " adicionado com sucesso!"
                );
            
            // Retira envio de email temporariamente - bloqueio de conta outlook
            // await this.sendEmail.execute(student.email, student.name);
            
            return student;
        } catch (error) {
            console.log(error);
            throw new Error('Error CreateStudentUseCase')
        }
  
    };
};