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
        const publication = await this.prisma.publication.create({
            data:createPostDto
        })

        return publication;
    }    

    async findAll(): Promise<Post[]> {
        const publications = await this.prisma.publication.findMany({
            include:{
                comment:{
                    select:{
                        id:true,
                        comment:true,
                        user:{
                            select:{
                                id:true,
                                name:true,
                                email:true
                            }
                        }
                    },
                    
                    
                }
            }
        });
        
        return publications;
    }

    async findById(id:string): Promise<Post> {
        const publication = await this.prisma.publication.findFirst({
            where:{
                id
            }
        });
        
        return publication;
    }

    async findByTitle(title:string): Promise<Post[]> {
        const publication = await this.prisma.publication.findMany({
            where:{
                title
            }, 
        })

        return publication;
    }

    async updatePost(id: string, updatePostDto:UpdatePostDto): Promise<Post> {
        const publicationUpdated = await this.prisma.publication.update({
            where:{
                id:id
            },
            data:updatePostDto
        })

        return publicationUpdated;
    }

    async removePost(id: string): Promise<Post> {
        const publicationRemoved = await this.prisma.publication.delete({
            where:{
                id
            }
        })

        return publicationRemoved;
    }
}