import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Post } from "../entities/post.entity";
import { PostsRepository } from "./post.repository";

@Injectable()
export class PostsPrismaRepository implements PostsRepository{
    constructor(private prisma:PrismaClient){}
    
    async execute(createPostDto: Post): Promise<Post> {
        const publication = await this.prisma.post.create({
            data:createPostDto
        })

        return publication;
    }    

    async findAll(): Promise<Post[]> {
        const publications = await this.prisma.post.findMany();
        
        return publications;
    }

    async findById(id:string): Promise<Post> {
        const publication = await this.prisma.post.findFirst({
            where:{
                id
            }
        });
        
        return publication;
    }

    async findByTitle(title:string): Promise<Post[]> {
        const publication = await this.prisma.post.findMany({
            where:{
                title
            }, 
        })

        return publication;
    }

    async updatePost(id: string, updatePostDto:UpdatePostDto): Promise<Post> {
        const publicationUpdated = await this.prisma.post.update({
            where:{
                id:id
            },
            data:updatePostDto
        })

        return publicationUpdated;
    }

    async removePost(id: string): Promise<Post> {
        const publicationRemoved = await this.prisma.post.delete({
            where:{
                id
            }
        })

        return publicationRemoved;
    }
}