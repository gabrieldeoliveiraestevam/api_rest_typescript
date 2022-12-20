import { Student } from "@entities/Student";

export interface IAddStudentInRoomResponse {
    id: number,
    name: string,
    description: string,
    students: Student[]
}