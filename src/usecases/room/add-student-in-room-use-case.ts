import { failure, succes } from "@usecases/errors/either";
import { RoomNotExistError } from "@usecases/errors/room-not-exist-error";
import { StudentExistInRoomError } from "@usecases/errors/student-exist-in-room-error";
import { StudentNotExistError } from "@usecases/errors/student-not-exist-error";
import { IRoomRepository } from "@usecases/port/repositories/room-repository";
import { IStudentRepository } from "@usecases/port/repositories/student-repository";
import { inject, injectable } from "tsyringe";
import { IAddStudentInRoomRequest } from "./domain/add-student-in-room-request";
import { IAddStudentInRoomResponse } from "./domain/add-student-in-room-response";

@injectable()
export class AddStudentInRoomUseCase {
    constructor(
        @inject("StudentRepositoryTypeOrm")
        private studentRepository: IStudentRepository,
        @inject("RoomRepositoryTypeOrm")
        private roomRepository: IRoomRepository
    ){

    }
    async execute(data: IAddStudentInRoomRequest): Promise<IAddStudentInRoomResponse> { 

        try {
            const roomExist = await this.roomRepository.findOneById(data.room_id)

            if (!roomExist) {
                return failure(new RoomNotExistError());
            };

            const studentExist = await this.studentRepository.findOneById(data.student_id);

            if (!studentExist) {
                return failure(new StudentNotExistError());
            };

            const studentExistInRoom = roomExist.students.find(student => student.id == studentExist.id);

            if (studentExistInRoom){
                return failure(new StudentExistInRoomError());
            };

            const roomUpdate = {
                ...roomExist,
                students: [studentExist].concat(roomExist.students)
            };

            const roomResult = await this.roomRepository.save(roomUpdate)   

            return succes(roomResult);
        } catch (error) {
            console.log(error);
            return failure(new Error('Error AddStudentInRoomUseCase'));
        }
  
    };
};