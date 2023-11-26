import { Room } from "@entities/room";
import { Either } from "@usecases/errors/either";

export interface ICreateVideoResponseData {
    id: number,
    title: string;
    url: string;
    room: Room;
};

export type ICreateVideoResponse = Either<Error, ICreateVideoResponseData>;
