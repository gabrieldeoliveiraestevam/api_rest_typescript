import { Either } from "@usecases/errors/either";

export interface ICreateSubjectResponseData {
    id: number;
    name: string;
};

export type ICreateSubjectResponse = Either<Error, ICreateSubjectResponseData>;