import { CreateRoomUseCase } from "@usecases/room/CreateRoomUseCase";
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
        try {
            const { name , description } = request.body;

            const room = await this.createRoomUseCase.execute({
                name: name,
                description: description
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