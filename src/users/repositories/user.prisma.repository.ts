import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { UsersRepository } from "./user.repository";

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
    constructor(private prisma:PrismaClient){}

    async execute(createUserDto:CreateUserDto): Promise<User> {
        const user = await this.prisma.user.create({
            data:createUserDto,
        })

        return user;
    }

    async findOne(email: string): Promise<User> {
        const userFound = await this.prisma.user.findFirst({
            where:{
                email,
            }
        })

        return userFound;
    }

    async findById(id: string): Promise<User> {
        const userFoundById = await this.prisma.user.findFirst({
            where:{
                id
            }
        })

        return userFoundById;
    }

    async findAll(): Promise<any> {
        const users = await this.prisma.user.findMany();

        return users;
    }
    
}