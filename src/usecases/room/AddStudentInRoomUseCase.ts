import { IRoomRepository } from "@usecases/port/repositories/IRoomRepository";
import { IStudentRepository } from "@usecases/port/repositories/IStudentRepository";
import { inject, injectable } from "tsyringe";
import { IAddStudentInRoomRequest } from "./domain/IAddStudentInRoomRequest";
import { IAddStudentInRoomResponse } from "./domain/IAddStudentInRoomResponse";

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
                throw new Error('Room not exist');
            }

            const studentExist = await this.studentRepository.findOneById(data.student_id);

            if (!studentExist) {
                throw new Error('Student not exist');
            }

            const studentExistInRoom = roomExist.students.find(student => student.id == studentExist.id);

            if (studentExistInRoom){
                throw new Error('Student exist in Room')
            }

            const roomUpdate = {
                ...roomExist,
                students: [studentExist].concat(roomExist.students)
            };

            const roomResult = await this.roomRepository.save(roomUpdate)   

            return roomResult;
        } catch (error) {
            console.log(error);
            throw new Error('Error AddStudentInRoomUseCase')
        }
  
    };
};