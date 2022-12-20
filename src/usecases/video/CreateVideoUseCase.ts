import { RoomRepositoryTypeOrm } from "@repositories/roomRepository";
import { VideoRepositoryTypeOrm } from "@repositories/videoRepository";
import { ICreateVideoRequest } from "./domain/ICreateVideoRequest";
import { ICreateVideoResponse } from "./domain/ICreateVideoResponse";

export class CreateVideoUseCase {
    constructor(
        private roomRepository: RoomRepositoryTypeOrm,
        private videoRepository: VideoRepositoryTypeOrm
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