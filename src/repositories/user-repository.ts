import { User } from '@entities/user';
import { injectable } from 'tsyringe';
import { Repository } from 'typeorm/repository/Repository';
import { AppDataSource } from '../data-source';

@injectable()
class UserRepositoryTypeOrm {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  create(name: string, email: string, password: string): User {
    return this.repository.create({
        name: name,
        email: email,
        password: password
    })
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async findOneByEmail(email: string): Promise<User|null> {
    return await this.repository.findOne({ 
        where: {email: email}
    })
  }

}

export { UserRepositoryTypeOrm };

export const userRepositoryTypeOrm = AppDataSource.getRepository(User);