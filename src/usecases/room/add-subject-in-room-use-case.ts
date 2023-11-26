import { failure, succes } from "@usecases/errors/either";
import { RoomNotExistError } from "@usecases/errors/room-not-exist-error";
import { SubjectExistInRoomError } from "@usecases/errors/subject-exist-in-room-error";
import { SubjectNotExistError } from "@usecases/errors/subject-not-exist-error";
import { IRoomRepository } from "@usecases/port/repositories/room-repository";
import { ISubjectRepository } from "@usecases/port/repositories/subject-repository";
import { inject, injectable } from "tsyringe";
import { IAddSubjectInRoomRequest } from "./domain/add-subject-in-room-request";
import { IAddSubjectInRoomResponse } from "./domain/add-subject-in-room-response";

@injectable()
export class AddSubjectInRoomUseCase {
    constructor(
        @inject("SubjectRepositoryTypeOrm")
        private subjectRepository: ISubjectRepository,
        @inject("RoomRepositoryTypeOrm")
        private roomRepository: IRoomRepository
    ){

    }
    async execute(data: IAddSubjectInRoomRequest): Promise<IAddSubjectInRoomResponse> { 

        try {
            const roomExist = await this.roomRepository.findOneById(data.room_id)

            if (!roomExist) {
                return failure(new RoomNotExistError());
            }

            const subjectExist = await this.subjectRepository.findOneById(data.subject_id);

            if (!subjectExist) {
                return failure(new SubjectNotExistError());
            }

            const subjectExistInRoom = roomExist.subjects.find(subject => subject.id == subjectExist.id);

            if (subjectExistInRoom){
                return failure(new SubjectExistInRoomError());
            }

            const roomUpdate = {
                ...roomExist,
                subjects: [subjectExist].concat(roomExist.subjects)
            };

            const roomResult = await this.roomRepository.save(roomUpdate);

            return succes(roomResult);
        } catch (error) {
            console.log(error);
            return failure(new Error('Error AddSubjectInRoomUseCase'));
        }
  
    };
};