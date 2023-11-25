import { IRoomRepository } from "@usecases/port/repositories/room-repository";
import { IVideoRepository } from "@usecases/port/repositories/video-repository";
import { inject, injectable } from "tsyringe";
import { ICreateVideoRequest } from "./domain/create-video-request";
import { ICreateVideoResponse } from "./domain/create-video-response";

@injectable()
export class CreateVideoUseCase {
    constructor(
        @inject("RoomRepositoryTypeOrm")
        private roomRepository: IRoomRepository,
        @inject("VideoRepositoryTypeOrm")
        private videoRepository: IVideoRepository
    ){

    }
    async execute(data: ICreateVideoRequest): Promise<ICreateVideoResponse> { 

        try {

            const roomExist = await this.roomRepository.findOneById(data.room_id);

            if (roomExist) {
                
                const video = this.videoRepository.create(
                    data.title,
                    data.url,
                    roomExist
                );
                
                await this.videoRepository.save(video);

                return video;
            } else {
                throw new Error('Room not exist');
            }

        } catch (error) {
            console.log(error);
            throw new Error('Error CreateVideoUseCase')
        }
  
    };
};