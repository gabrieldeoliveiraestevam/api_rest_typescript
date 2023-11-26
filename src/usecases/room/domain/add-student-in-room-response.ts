import { Student } from "@entities/student";
import { Either } from "@usecases/errors/either";

export interface IAddStudentInRoomResponseData {
    id: number,
    name: string,
    description: string,
    students: Student[]
}

export type IAddStudentInRoomResponse = Either<Error, IAddStudentInRoomResponseData>;