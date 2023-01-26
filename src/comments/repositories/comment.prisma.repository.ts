import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { Comment } from "../entities/comment.entity";
import { CommentsRepository } from "./comment.repository";

@Injectable()
export class CommentsPrismaRepository implements CommentsRepository {
    constructor(private prisma:PrismaClient) {}

    async execute(createCommentDto: CreateCommentDto):Promise<any> {
        const comment = await this.prisma.comment.create({
            data:createCommentDto
        })
       return comment;
    return comment;
    }
}