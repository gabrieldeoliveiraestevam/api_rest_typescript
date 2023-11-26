import { failure, succes } from "@usecases/errors/either";
import { IRoomRepository } from "@usecases/port/repositories/room-repository";
import { inject, injectable } from "tsyringe";
import { IListRoomResponse } from "./domain/list-room-response";

@injectable()
export class ListRoomUseCase {
    constructor(
        @inject("RoomRepositoryTypeOrm")
        private roomRepository: IRoomRepository
    ){

    }
    async execute(): Promise<IListRoomResponse> { 

        try {

            // Busca Rooms com todos os seus relacionamentos de Subject
            const rooms = await this.roomRepository.find();

            return succes({list: rooms});
        } catch (error) {
            console.log(error);
            return failure(new Error('Error AddSubjectInRoomUseCase'));
        }
  
    };
};