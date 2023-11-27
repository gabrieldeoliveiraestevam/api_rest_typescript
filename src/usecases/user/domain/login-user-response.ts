import { Either } from "@usecases/errors/either";

export interface LoginUserResponseData {
    token: string;
}

export type LoginUserResponse = Either<Error, LoginUserResponseData>;