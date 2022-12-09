import { SubjectRepositoryTypeOrm } from "../../repositories/subjectRepository";
import { ICreateSubjectRequest } from "./domain/ICreateSubjectRequest";
import { ICreateSubjectResponse } from "./domain/ICreateSubjectResponse";

export class CreateSubjectUseCase {
    constructor(
        private subjectRepository: SubjectRepositoryTypeOrm
    ){

    }
    async execute(data: ICreateSubjectRequest): Promise<ICreateSubjectResponse> { 

        try {
            const subject = this.subjectRepository.create(data.name);

            await this.subjectRepository.save(subject);
    
            return subject;
        } catch (error) {
            console.log(error);
            throw new Error('Error CreateSubjectUseCase')
        }
  
    };
};