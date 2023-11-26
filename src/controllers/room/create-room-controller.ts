import { CreateRoomUseCase } from "@usecases/room/create-room-use-case";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateRoomController {
    constructor(
        @inject("CreateRoomUseCase")
        private createRoomUseCase: CreateRoomUseCase
    ){
        
    }
    async handle(request: Request, response: Response) { 
        const { name , description } = request.body;

        const result = await this.createRoomUseCase.execute({
            name: name,
            description: description
        });

        if (result.isSucces()){
            return response.status(200).json(result);
        } else {
            return response.status(500).json({message: result.value.message});
        }
            
    };
};