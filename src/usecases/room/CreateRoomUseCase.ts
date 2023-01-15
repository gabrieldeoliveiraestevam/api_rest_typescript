import { IRoomRepository } from "@usecases/port/repositories/IRoomRepository";
import { ICreateSubjectResponse } from "@usecases/subject/domain/ICreateSubjectResponse";
import { inject, injectable } from "tsyringe";
import { ICreateRoomRequest } from "./domain/ICreateRoomRequest";

@injectable()
export class CreateRoomUseCase {
    constructor(
        @inject("RoomRepositoryTypeOrm")
        private roomRepository: IRoomRepository
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