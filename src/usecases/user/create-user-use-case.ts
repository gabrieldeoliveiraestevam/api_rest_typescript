import { failure, succes } from "@usecases/errors/either";
import { IUserRepository } from "@usecases/port/repositories/user-respository";
import { inject, injectable } from "tsyringe";
import { ICreateUserRequest } from "./domain/create-user-request";
import { ICreateUserResponse } from "./domain/create-user-response";
import bcrypt from 'bcrypt';
import { EmailAlreadyRegistered } from "@usecases/errors/email-already-registered";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UserRepositoryTypeOrm")
        private userRepository: IUserRepository
    ){

    }
    async execute(data: ICreateUserRequest): Promise<ICreateUserResponse> { 

        try {
            const emailExist = await this.userRepository.findOneByEmail(data.email);

            if (emailExist == null) {
                const hashPassword = await bcrypt.hash(data.password, 10);
                const newUser = await this.userRepository.create(data.name, data.email, hashPassword);
                await this.userRepository.save(newUser);
                
                return succes({
                    name: newUser.name,
                    email: newUser.email
                });
            } else {
                return failure(new EmailAlreadyRegistered());
            }   
        } catch (error) {
            console.log(error);
            return failure(new Error('Error CreateSubjectUseCase'));
        }
  
    };
};