import { Subject } from '@entities/subject';
import { ISubjectRepository } from '@usecases/port/repositories/subject-repository';
import { injectable } from 'tsyringe';
import { Repository } from 'typeorm/repository/Repository';
import { AppDataSource } from '../data-source';

@injectable()
class SubjectRepositoryTypeOrm implements ISubjectRepository {
  private repository: Repository<Subject>;

  constructor() {
    this.repository = AppDataSource.getRepository(Subject);
  }

  create(name: string): Subject {
    return this.repository.create({ name })
  }

  async save(subject: Subject): Promise<Subject> {
    return await this.repository.save(subject);
  }

  async findOneById(id: number): Promise<Subject|null> {
    return await this.repository.findOne({ 
        where: {id: id}
    })
  }
}

export { SubjectRepositoryTypeOrm };
