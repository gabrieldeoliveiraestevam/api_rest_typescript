import { AddStudentInRoomUseCase } from "@usecases/room/add-student-in-room-use-case";
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
        const { room_id , student_id } = request.body;

        const result = await this.addStudentInRoomUseCase.execute({
            room_id: room_id,
            student_id: student_id
        });

        if (result.isSucces()){
            return response.status(200).json(result)
        } else {
            return response.status(500).json({message: result.value.message});
        };
            
    };
};