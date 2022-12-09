import { Request, Response } from "express";
import { ListRoomUseCase } from "../../usecases/room/LIstRoomUseCase";

export class ListRoomController {
    constructor(
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