import { Config } from "@config/index";
import { userRepositoryTypeOrm } from "@repositories/user-repository";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id: number
}

// Processo de autenticação de usuário logado => Melhorar!!!!
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        // Verifica se authorization existe no header
        if(!authorization){
            return res.status(401).json("Not authorized");
        }
    
        const token = authorization.split(' ')[1];
        // Verifica o token não foi informado
        if (token == "undefined"){
            return res.status(401).json("Not authorized");
        };
    
        const { id } = jwt.verify(token, Config.JWT.PASSWORD) as JwtPayload;
        
        const userAuth = await userRepositoryTypeOrm.findOne({ 
            where: {id: id}
        })
        // Verifica se o token informado é valido. Pesquisando na tabela user.
        if(!userAuth){
            return res.status(401).json("Not authorized");
        }
        // Inclui o user autenticado no request
        req.user = userAuth;
    
        next();       
    } catch (error) {
        return res.status(500).json("Not authorized");
    }

}