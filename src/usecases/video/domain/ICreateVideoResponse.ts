import { Room } from "@entities/Room";

export interface ICreateVideoResponse {
    id: number,
    title: string;
    url: string;
    room: Room;
};