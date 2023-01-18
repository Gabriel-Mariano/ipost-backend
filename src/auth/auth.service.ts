import { Injectable } from '@nestjs/common';
import { UsersPrismaRepository } from 'src/users/repositories/user.prisma.repository';
import { JwtService } from '@nestjs/jwt';
import { compare, compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma:UsersPrismaRepository,
        private jwtService:JwtService
    ){}

    async validateUser(email:string, password:string): Promise<any> {
        const user = await this.prisma.findOne(email);
       
        if(user && await compare(password, user.password)) {
            const { password, ...result } = user;
            
            return result;
        }
        return null;
    }

    async login(user:any) {
        const payload = { email:user.email, sub:user.id }
        
        return {
            access_token:this.jwtService.sign(payload)
        }
    }
}
