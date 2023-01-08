import { StudentRepositoryTypeOrm } from "@repositories/studentRepository";
import { sendEmail } from "@services/sendEmail";
import { ICreateStudentRequest } from "./domain/ICreateStudentRequest";
import { ICreateStudentResponse } from "./domain/ICreateStudentResponse";

export class CreateStudentUseCase {
    constructor(
        private studentRepository: StudentRepositoryTypeOrm,
        private sendEmail: sendEmail,
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

            await this.sendEmail.execute(student.email);
    
            return student;
        } catch (error) {
            console.log(error);
            throw new Error('Error CreateStudentUseCase')
        }
  
    };
};