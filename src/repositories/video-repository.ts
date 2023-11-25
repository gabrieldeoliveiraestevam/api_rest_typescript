import { Room } from '@entities/room';
import { Video } from '@entities/video';
import { IVideoRepository } from '@usecases/port/repositories/video-repository';
import { injectable } from 'tsyringe';
import { Repository } from 'typeorm/repository/Repository';
import { AppDataSource } from '../data-source';

@injectable()
class VideoRepositoryTypeOrm implements IVideoRepository {
  private repository: Repository<Video>;

  constructor() {
    this.repository = AppDataSource.getRepository(Video);
  }

  create(title: string, url: string, room: Room): Video {
    return this.repository.create({
        title: title,
        url: url,
        room: room
    })
  }

  async save(Video: Video): Promise<Video> {
    return await this.repository.save(Video);
  }

  async findOneById(id: number): Promise<Video|null> {
    return await this.repository.findOne({ 
        where: {id: id}
    })
  }
}

export { VideoRepositoryTypeOrm };
