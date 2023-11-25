import { Room } from "@entities/room";

export interface ICreateVideoResponse {
    id: number,
    title: string;
    url: string;
    room: Room;
};