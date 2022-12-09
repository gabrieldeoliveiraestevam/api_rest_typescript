import { Request, Response } from "express";
import { AddSubjectInRoomUseCase } from "../../usecases/room/AddSubjectInRoomUseCase";

export class AddSubjectInRoomController {
    constructor(
        private addSubjectInRoomUseCase: AddSubjectInRoomUseCase
    ){
        
    }
    async handle(request: Request, response: Response) { 
        try {
            const { room_id , subject_id } = request.body;

            const room = await this.addSubjectInRoomUseCase.execute({
                room_id: room_id,
                subject_id: subject_id
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