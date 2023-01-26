import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { BodyCommentDto } from "../dto/body-comment.dto";
import { CommentsRepository } from "./comment.repository";

@Injectable()
export class CommentsPrismaRepository implements CommentsRepository {
    constructor(private prisma:PrismaClient) {}

    async execute(createCommentDto: any):Promise<any> {
        const { postId } = createCommentDto;
        
        const comment = await this.prisma.comment.create({
            data:{
                id:createCommentDto.id,
                comment:createCommentDto.comment, 
                post:{ connect:{ id:postId } },
                user:{ connect:{ id:createCommentDto.authorId } },
            },
        })

       return comment;

    }
}