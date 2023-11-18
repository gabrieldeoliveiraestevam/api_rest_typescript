import { ListRoomUseCase } from "@usecases/room/ListRoomUseCase";
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
        try {
            const rooms = await this.listRoomUseCase.execute();

            return response.status(200).json(rooms)
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Internal Server Error!'
            });
        }
    };
};