import { Student } from "@entities/student";

export interface IAddStudentInRoomResponse {
    id: number,
    name: string,
    description: string,
    students: Student[]
}