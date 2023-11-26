import { Either } from "@usecases/errors/either";

export interface ICreateRoomResponseData {
    id: number;
    name: string;
    description: string;
};

export type ICreateRoomResponse = Either<Error, ICreateRoomResponseData>;