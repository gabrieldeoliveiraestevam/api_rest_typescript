import { CreateSubjectUseCase } from "@usecases/subject/create-subject-use-case";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateSubjectController {
    constructor(
        @inject("CreateSubjectUseCase")
        private createSubjectUseCase: CreateSubjectUseCase
    ){
        
    }
    async handle(request: Request, response: Response) { 
        const { name } = request.body;

        const result = await this.createSubjectUseCase.execute({
            name: name
        });

        if (result.isSucces()){
            return response.status(200).json(result.value);
        } else {
            return response.status(500).json({message: result.value.message});
        }
    };
};