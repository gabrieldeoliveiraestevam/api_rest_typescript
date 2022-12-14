import { CreateSubjectUseCase } from "@usecases/subject/CreateSubjectUseCase";
import { Request, Response } from "express";

export class CreateSubjectController {
    constructor(
        private createSubjectUseCase: CreateSubjectUseCase
    ){
        
    }
    async handle(request: Request, response: Response) { 
        try {
            const { name } = request.body;

            const subject = await this.createSubjectUseCase.execute({
                name: name
            });

            return response.status(200).json(subject)
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Internal Server Error!'
            });
        }
    };
};