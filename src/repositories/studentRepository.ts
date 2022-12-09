import { Repository } from 'typeorm/repository/Repository';
import { AppDataSource } from '../data-source';
import { Student } from '../entities/Student';
import { IStudentRepository } from '../usecases/port/repositories/IStudentRepository';

class StudentRepositoryTypeOrm implements IStudentRepository {
  private repository: Repository<Student>;

  constructor() {
    this.repository = AppDataSource.getRepository(Student);
  }

  create(name: string, birth_date: Date): Student {
    return this.repository.create({ 
        name: name,
        birth_date: birth_date 
    })
  }

  async save(student: Student): Promise<Student> {
    return await this.repository.save(student);
  }

  async findOneById(id: number): Promise<Student|null> {
    return await this.repository.findOne({ 
        where: {id: id}
    })
  }
}

export { StudentRepositoryTypeOrm };
