import { CreateStudentUseCase } from "@usecases/student/CreateStudentUseCase";
import { Request, Response } from "express";

export class CreateStudentController {
    constructor(
        private createStudentUseCase: CreateStudentUseCase
    ){
        
    }
    async handle(request: Request, response: Response) { 
        try {
            const { name , birth_date } = request.body;

            const Student = await this.createStudentUseCase.execute({
                name: name,
                birth_date: birth_date
            });

            return response.status(200).json(Student)
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Internal Server Error!'
            });
        }
    };
};