import { RoomRepositoryTypeOrm } from "../../repositories/roomRepository";
import { StudentRepositoryTypeOrm } from "../../repositories/studentRepository";
import { IAddStudentInRoomRequest } from "./domain/IAddStudentInRoomRequest";
import { IAddStudentInRoomResponse } from "./domain/IAddStudentInRoomResponse";


export class AddStudentInRoomUseCase {
    constructor(
        private studentRepository: StudentRepositoryTypeOrm,
        private roomRepository: RoomRepositoryTypeOrm
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