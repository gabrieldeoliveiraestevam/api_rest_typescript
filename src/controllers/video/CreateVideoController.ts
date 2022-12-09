import { Request, Response } from "express";
import { CreateVideoUseCase } from "../../usecases/video/CreateVideoUseCase";

export class CreateVideoController {
    constructor(
        private createVideoUseCase: CreateVideoUseCase
    ){
        
    }
    async handle(request: Request, response: Response) { 
        try {
            const { title, url, room_id } = request.body;

            const video = await this.createVideoUseCase.execute({
                title: title,
                url: url,
                room_id: room_id,
            });

            return response.status(200).json(video)
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Internal Server Error!'
            });
        }
    };
};