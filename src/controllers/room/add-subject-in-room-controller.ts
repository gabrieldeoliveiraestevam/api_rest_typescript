import { AddSubjectInRoomUseCase } from "@usecases/room/add-subject-in-room-use-case";
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

        const { room_id , subject_id } = request.body;

        const result = await this.addSubjectInRoomUseCase.execute({
            room_id: room_id,
            subject_id: subject_id
        });

        if (result.isSucces()){
            return response.status(200).json(result.value);
        } else {
            return response.status(500).json({message: result.value.message});
        }
    };
};