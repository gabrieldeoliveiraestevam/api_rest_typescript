import { User } from "@entities/user";

export interface IUserRepository {
    create(name: string, email: string, password: string): User;
    save(user: User): Promise<User>;
    findOneByEmail(email: string): Promise<User|null>;
}