import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authorId = req.headers.authorid;
        
        const [,token] = req.headers.authorization.split(" ");

        const jwt = new JwtService();

        const decode = jwt.decode(token);

        if(authorId !== decode.sub){
            throw new HttpException({
                message:'Você não tem permissão para está ação'
            }, HttpStatus.UNAUTHORIZED);
        }
        
        next()
    }
}