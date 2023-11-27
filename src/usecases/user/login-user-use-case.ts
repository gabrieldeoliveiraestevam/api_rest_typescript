import { failure, succes } from "@usecases/errors/either";
import { IUserRepository } from "@usecases/port/repositories/user-respository";
import { inject, injectable } from "tsyringe";
import bcrypt from 'bcrypt';
import { ILoginUserRequest } from "./domain/login-user-request";
import { EmailOrPasswordInvalid } from "@usecases/errors/email-or-password-invalid";
import jwt from "jsonwebtoken";
import { Config } from "@config/index";
import { LoginUserResponse } from "./domain/login-user-response";

@injectable()
export class LoginUserUseCase {
    constructor(
        @inject("UserRepositoryTypeOrm")
        private userRepository: IUserRepository
    ){

    }
    async execute(data: ILoginUserRequest): Promise<LoginUserResponse> { 

        try {
            const user = await this.userRepository.findOneByEmail(data.email);

            if (user) {
                const verifyPassword = await bcrypt.compare(data.password, user.password);

                if (!verifyPassword){
                    return failure(new EmailOrPasswordInvalid());
                } else {
                    const token = jwt.sign(
                        { id: user.id }, 
                        Config.JWT.PASSWORD, 
                        {expiresIn: '8h'}
                    );
                    return succes({
                        token: token
                    });
                }
            } 
            
            return failure(new EmailOrPasswordInvalid());   
        } catch (error) {
            console.log(error);
            return failure(new Error('Error CreateSubjectUseCase'));
        }
  
    };
};