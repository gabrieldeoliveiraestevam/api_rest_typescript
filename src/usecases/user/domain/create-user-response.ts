import { Either } from "@usecases/errors/either";

export interface ICreateUserResponseData {
    name: string,
    email: string,
}

export type ICreateUserResponse = Either<Error, ICreateUserResponseData>;