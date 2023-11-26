import { Subject } from "@entities/subject";
import { Either } from "@usecases/errors/either";

export interface IAddSubjectInRoomResponseData {
    id: number,
    name: string,
    description: string,
    subjects: Subject[]
}

export type IAddSubjectInRoomResponse = Either<Error, IAddSubjectInRoomResponseData>;