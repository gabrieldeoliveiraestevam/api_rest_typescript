import { AddStudentInRoomUseCase } from "@usecases/room/AddStudentInRoomUseCase";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddStudentInRoomController {
    constructor(
        @inject("AddStudentInRoomUseCase")
        private addStudentInRoomUseCase: AddStudentInRoomUseCase
    ){
        
    }
    async handle(request: Request, response: Response) { 
        try {
            const { room_id , student_id } = request.body;

            const room = await this.addStudentInRoomUseCase.execute({
                room_id: room_id,
                student_id: student_id
            });

            return response.status(200).json(room)
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Internal Server Error!'
            });
        }
    };
};