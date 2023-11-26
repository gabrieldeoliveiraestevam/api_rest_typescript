import { StudentPresenceUseCase } from '@usecases/student/student-presence-use-case';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class StudentPresenceController {
    constructor(
        @inject('StudentPresenceUseCase')
        private studentPresenceUseCase: StudentPresenceUseCase
    ) {}
    async handle(request: Request, response: Response) {
        const { id, date, presence } = request.body;

        const result = await this.studentPresenceUseCase.execute({
            id,
            date,
            presence
        });

        if (result.isSucces()){
            return response.status(200).json(result.value);
        } else {
            return response.status(500).json({message: result.value.message});
        }
    }
}
