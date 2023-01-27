import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { BodyCommentDto } from "../dto/body-comment.dto";
import { UpdateCommentDto } from "../dto/update-comment.dto";
import { Comment } from "../entities/comment.entity";
import { CommentsRepository } from "./comment.repository";

@Injectable()
export class CommentsPrismaRepository implements CommentsRepository {
    constructor(private prisma:PrismaClient) {}

    async execute(createCommentDto: any):Promise<any> {
        
        const comment = await this.prisma.comment.create({
            data:{
                id:createCommentDto.id,
                comment:createCommentDto.comment, 
                post:{ connect:{ id:createCommentDto.postId } },
                user:{ connect:{ id:createCommentDto.authorId } },
            },
        })

       return comment;
    }

    async findOne(id: string): Promise<Comment> {
        const comment = await this.prisma.comment.findFirst({
            where:{
                id
            }
        })

        return comment;
    }

    async updateComment(id: string, updateCommentDto:UpdateCommentDto): Promise<Comment> {
        const updatedComment = await this.prisma.comment.update({
            where:{
                id:id
            },
            data:updateCommentDto
        })

        return updatedComment;
    }

    async removeComment(id:string):Promise<Comment> {
        const removedComment = await this.prisma.comment.delete({
            where:{
                id
            }
        });

        return removedComment;
    }
}