import { Repository } from 'typeorm/repository/Repository';
import { AppDataSource } from '../data-source';
import { Room } from '../entities/Room';
import { Student } from '../entities/Student';
import { IRoomRepository } from '../usecases/port/repositories/IRoomRepository';

class RoomRepositoryTypeOrm implements IRoomRepository{
  private repository: Repository<Room>;

  constructor() {
    this.repository = AppDataSource.getRepository(Room);
  }

  create(name: string, description: string): Room {
    return this.repository.create({ 
        name: name,
        description: description
    })
  }

  async save(room: Room): Promise<Room> {
    return await this.repository.save(room);
  }

  async findOneById(id: number): Promise<Room|null> {
    return await this.repository.findOne({ 
        where: {id: id},
        relations: {
          subjects: true,
          videos: true,
          students: true,
      }
    })
  }

  async find(): Promise<Room[]>{
    return await this.repository.find({
        relations: {
            subjects: true,
            videos: true,
            students: true,
        },
        order: {
          id: 'ASC'
        },
    })
  }
  
  async updateStudents(id: number, students: Student[]): Promise<void>{
    await this.repository.update({
      id: id,
    },
    {
      students: students,
    })
  }
}

export { RoomRepositoryTypeOrm };
