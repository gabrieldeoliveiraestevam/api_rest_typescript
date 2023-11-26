import { CreateStudentUseCase } from '@usecases/student/create-student-use-case';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateStudentController {
    constructor(
        @inject('CreateStudentUseCase')
        private createStudentUseCase: CreateStudentUseCase
    ) {}
    async handle(request: Request, response: Response) {
        const { name, birth_date, email } = request.body;

        const result = await this.createStudentUseCase.execute({
            name: name,
            birth_date: birth_date,
            email: email,
        });

        if (result.isSucces()){
            return response.status(200).json(result.value);
        } else {
            return response.status(500).json({message: result.value.message});
        }
    }
}
