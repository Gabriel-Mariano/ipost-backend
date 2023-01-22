import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export abstract class UsersRepository {
    abstract execute(createUserDto:CreateUserDto):Promise<User>
    abstract findOne(email:string):Promise<User>;
    abstract findById(id:string):Promise<User>;
    abstract findAll():Promise<User[]>;
    abstract updateUser(id:string, updateUserDto:UpdateUserDto):Promise<User>;
    abstract removeUser(id:string):Promise<User>;
}