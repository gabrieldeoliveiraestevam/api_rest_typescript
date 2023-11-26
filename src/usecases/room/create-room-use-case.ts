import { failure, succes } from "@usecases/errors/either";
import { IRoomRepository } from "@usecases/port/repositories/room-repository";
import { ICreateSubjectResponse } from "@usecases/subject/domain/create-subject-response";
import { inject, injectable } from "tsyringe";
import { ICreateRoomRequest } from "./domain/create-room-request";

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
    
            return succes(room);
        } catch (error) {
            console.log(error);
            return failure(new Error('Error CreateRoomUseCase'));
        }
  
    };
};