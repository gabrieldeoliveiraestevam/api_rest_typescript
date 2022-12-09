import { StudentRepositoryTypeOrm } from "../../repositories/studentRepository";
import { ICreateSubjectResponse } from "../subject/domain/ICreateSubjectResponse";
import { ICreateStudentRequest } from "./domain/ICreateStudentRequest";

export class CreateStudentUseCase {
    constructor(
        private studentRepository: StudentRepositoryTypeOrm
    ){

    }
    async execute(data: ICreateStudentRequest): Promise<ICreateSubjectResponse> { 

        try {
            
            const birth_date_object = new Date(data.birth_date);

            const student = this.studentRepository.create(
                data.name,
                birth_date_object
            );

            await this.studentRepository.save(student);
    
            return student;
        } catch (error) {
            console.log(error);
            throw new Error('Error CreateStudentUseCase')
        }
  
    };
};