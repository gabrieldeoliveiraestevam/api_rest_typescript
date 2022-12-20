import { RoomRepositoryTypeOrm } from "@repositories/roomRepository";
import { SubjectRepositoryTypeOrm } from "@repositories/subjectRepository";
import { IAddSubjectInRoomRequest } from "./domain/IAddSubjectInRoomRequest";
import { IAddSubjectInRoomResponse } from "./domain/IAddSubjectInRoomResponse";

export class AddSubjectInRoomUseCase {
    constructor(
        private subjectRepository: SubjectRepositoryTypeOrm,
        private roomRepository: RoomRepositoryTypeOrm
    ){

    }
    async execute(data: IAddSubjectInRoomRequest): Promise<IAddSubjectInRoomResponse> { 

        try {
            const roomExist = await this.roomRepository.findOneById(data.room_id)

            if (!roomExist) {
                throw new Error('Room not exist');
            }

            const subjectExist = await this.subjectRepository.findOneById(data.subject_id);

            if (!subjectExist) {
                throw new Error('Subject not exist');
            }

            const subjectExistInRoom = roomExist.subjects.find(subject => subject.id == subjectExist.id);

            if (subjectExistInRoom){
                throw new Error('Subject exist in Room')
            }

            const roomUpdate = {
                ...roomExist,
                subjects: [subjectExist].concat(roomExist.subjects)
            };

            const roomResult = await this.roomRepository.save(roomUpdate);

            return roomResult;
        } catch (error) {
            console.log(error);
            throw new Error('Error AddSubjectInRoomUseCase')
        }
  
    };
};