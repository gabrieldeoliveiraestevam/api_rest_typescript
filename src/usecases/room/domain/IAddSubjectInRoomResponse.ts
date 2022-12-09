import { Subject } from "../../../entities/Subject";

export interface IAddSubjectInRoomResponse {
    id: number,
    name: string,
    description: string,
    subjects: Subject[]
}