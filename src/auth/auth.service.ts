import { Injectable } from '@nestjs/common';
import { UsersPrismaRepository } from 'src/users/repositories/user.prisma.repository';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private primsa:UsersPrismaRepository){}

    async validateUser(email:string, password:string): Promise<any> {
        const user = await this.primsa.findOne(email);
        if(user && await compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
