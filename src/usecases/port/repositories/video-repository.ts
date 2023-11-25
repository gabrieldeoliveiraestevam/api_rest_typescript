import { Room } from "@entities/room";
import { Video } from "@entities/video";

export interface IVideoRepository {
  save(Video: Video): Promise<Video>;
  create(title: string, url: string, room: Room): Video;
  findOneById(id: number): Promise<Video|null>;
}
