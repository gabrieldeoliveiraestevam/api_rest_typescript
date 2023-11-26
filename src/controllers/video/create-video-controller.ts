import { CreateVideoUseCase } from "@usecases/video/create-video-use-case";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateVideoController {
    constructor(
        @inject("CreateVideoUseCase")
        private createVideoUseCase: CreateVideoUseCase
    ){
        
    }
    async handle(request: Request, response: Response) { 
        const { title, url, room_id } = request.body;

        const result = await this.createVideoUseCase.execute({
            title: title,
            url: url,
            room_id: room_id,
        });

        if (result.isSucces()){
            return response.status(200).json(result);
        } else {
            return response.status(500).json({message: result.value.message});
        }
    };
};