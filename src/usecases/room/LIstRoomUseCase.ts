import { Room } from "@entities/Room";
import { RoomRepositoryTypeOrm } from "@repositories/roomRepository";


export class ListRoomUseCase {
    constructor(
        private roomRepository: RoomRepositoryTypeOrm
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