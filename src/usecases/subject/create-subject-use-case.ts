import { ISubjectRepository } from "@usecases/port/repositories/subject-repository";
import { inject, injectable } from "tsyringe";
import { ICreateSubjectRequest } from "./domain/create-subject-request";
import { ICreateSubjectResponse } from "./domain/create-subject-response";

@injectable()
export class CreateSubjectUseCase {
    constructor(
        @inject("SubjectRepositoryTypeOrm")
        private subjectRepository: ISubjectRepository
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