import { AddSubjectInRoomUseCase } from "@usecases/room/AddSubjectInRoomUseCase";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddSubjectInRoomController {
    constructor(
        @inject("AddSubjectInRoomUseCase")
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