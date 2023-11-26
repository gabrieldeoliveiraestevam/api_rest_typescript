import { Room } from "@entities/room";
import { Either } from "@usecases/errors/either";

export interface IListRoomResponseData {
    list: Room[];
};

export type IListRoomResponse = Either<Error, IListRoomResponseData>;