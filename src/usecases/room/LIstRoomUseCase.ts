import { Room } from "@entities/Room";
import { IRoomRepository } from "@usecases/port/repositories/IRoomRepository";
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