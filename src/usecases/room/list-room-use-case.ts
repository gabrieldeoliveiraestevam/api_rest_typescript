import { Room } from "@entities/room";
import { IRoomRepository } from "@usecases/port/repositories/room-repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRoomUseCase {
    constructor(
        @inject("RoomRepositoryTypeOrm")
        private roomRepository: IRoomRepository
    ){

    }
    async execute(): Promise<Room[]> { 

        try {

            // Busca Rooms com todos os seus relacionamentos de Subject
            const rooms = await this.roomRepository.find();

            return rooms;
        } catch (error) {
            console.log(error);
            throw new Error('Error AddSubjectInRoomUseCase')
        }
  
    };
};