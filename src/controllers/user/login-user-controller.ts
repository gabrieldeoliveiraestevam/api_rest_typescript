import { LoginUserUseCase } from "@usecases/user/login-user-use-case";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class LoginUserController {
    constructor(
        @inject("LoginUserUseCase")
        private loginUserUseCase: LoginUserUseCase
    ){
        
    }
    async handle(request: Request, response: Response) { 
        const { email , password } = request.body;

        const result = await this.loginUserUseCase.execute({
            email: email,
            password: password,
        });

        if (result.isSucces()){
            return response.status(200).json(result.value);
        } else {
            return response.status(500).json({message: result.value.message});
        }
    };
};