import { Room } from "../../../entities/Room";
import { Video } from "../../../entities/Video";

export interface IVideoRepository {
  save(Video: Video): Promise<Video>;
  create(title: string, url: string, room: Room): Video;
  findOneById(id: number): Promise<Video|null>;
}
