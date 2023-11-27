import { User } from "@entities/user";

// criacao do campo user nos parametros de request - sobreescreve request do express
declare global {
    namespace Express {
        export interface Request {
            user: Partial<User>;
        }
    }
}