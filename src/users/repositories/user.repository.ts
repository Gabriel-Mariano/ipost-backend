import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export abstract class UsersRepository {
    abstract execute(createUserDto:CreateUserDto):Promise<User>
    abstract findOne(email:string):Promise<User>;
}