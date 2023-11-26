import { IStudentRepository } from "@usecases/port/repositories/student-repository";
import { ISendEmail } from "@usecases/port/service/send-email";
import { ISendStudentGrade } from "@usecases/port/service/send-student-grade";
import { inject, injectable } from "tsyringe";
import { ICreateStudentRequest } from "./domain/create-student-request";
import { ICreateStudentResponse } from "./domain/create-student-response";

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
            
            const gradeSent = await this.sendStudentGrade.execute(
                student.id,
                student.name,
                10
            );

            if (gradeSent) {
                console.log(`Nota do aluno ${data.name} enviada para o serviço de notas`);
            } else {
                console.log(`Problema no envio da nota do aluno ${data.name}`);
            }

            // Retira envio de email temporariamente - bloqueio de conta outlook
            // await this.sendEmail.execute(student.email, student.name);
            
            return student;
        } catch (error) {
            console.log(error);
            throw new Error('Error CreateStudentUseCase')
        }
  
    };
};