import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export const validateAuthorization = (data:any, auth:string) => {
    const [,token] = auth.split(" ");

    const jwt = new JwtService();
    
    const decode = jwt.decode(token);

    if(data.authorId === decode.sub){
        return true;
    } else {
        return false;
    }
    
}