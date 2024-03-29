import { Room } from "@entities/room";

export interface IRoomRepository {
  save(Room: Room): Promise<Room>;
  create(name: string, description: string): Room;
  findOneById(id: number): Promise<Room|null>;
  find(): Promise<Room[]>;
}
