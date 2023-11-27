import { CreateUserUseCase } from "@usecases/user/create-user-use-case";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserController {
    constructor(
        @inject("CreateUserUseCase")
        private createUserUseCase: CreateUserUseCase
    ){
        
    }
    async handle(request: Request, response: Response) { 
        const { name , email , password } = request.body;

        const result = await this.createUserUseCase.execute({
            name: name,
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