import { RoomRepositoryTypeOrm } from "@repositories/roomRepository";
import { ICreateSubjectResponse } from "@usecases/subject/domain/ICreateSubjectResponse";
import { ICreateRoomRequest } from "./domain/ICreateRoomRequest";

export class CreateRoomUseCase {
    constructor(
        private roomRepository: RoomRepositoryTypeOrm
    ){

    }
    async execute(data: ICreateRoomRequest): Promise<ICreateSubjectResponse> { 

        try {
            const room = this.roomRepository.create(
                data.name,
                data.description
            );

            await this.roomRepository.save(room);
    
            return room;
        } catch (error) {
            console.log(error);
            throw new Error('Error CreateRoomUseCase')
        }
  
    };
};