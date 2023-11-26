import { ListRoomUseCase } from "@usecases/room/list-room-use-case";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRoomController {
    constructor(
        @inject("ListRoomUseCase")
        private listRoomUseCase: ListRoomUseCase
    ){
        
    }
    async handle(request: Request, response: Response) { 
        const result = await this.listRoomUseCase.execute();

        if (result.isSucces()){
            return response.status(200).json(result);
        } else {
            return response.status(500).json({message: result.value.message});
        }

    };
};