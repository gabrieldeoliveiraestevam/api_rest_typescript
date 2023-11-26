import { Either } from "@usecases/errors/either";

export interface ICreateStudentResponseData {
    id: number;
    name: string;
    birth_date: Date;
    email: string;
}

export type ICreateStudentResponse = Either<Error, ICreateStudentResponseData>;