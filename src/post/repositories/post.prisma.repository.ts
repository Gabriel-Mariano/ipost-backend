import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreatePostDto } from "../dto/create-post.dto";
import { Post } from "../entities/post.entity";
import { PostsRepository } from "./post.repository";

@Injectable()
export class PostsPrismaRepository implements PostsRepository{
    constructor(private prisma:PrismaClient){}
    
    async execute(createPostDto: Post): Promise<any> {
        const publication = await this.prisma.post.create({
            data:createPostDto
        })

        return publication;
    }    
}