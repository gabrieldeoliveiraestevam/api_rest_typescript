import { Subject } from "@entities/subject";

export interface IAddSubjectInRoomResponse {
    id: number,
    name: string,
    description: string,
    subjects: Subject[]
}