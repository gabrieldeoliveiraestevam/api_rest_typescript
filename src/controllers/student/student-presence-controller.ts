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
        try {
            const { id, date, presence } = request.body;

            await this.studentPresenceUseCase.execute({
                id,
                date,
                presence
            });

            return response.status(202).json();
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Internal Server Error!',
            });
        }
    }
}
