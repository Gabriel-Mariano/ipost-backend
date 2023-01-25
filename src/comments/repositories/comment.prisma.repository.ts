import { PrismaClient } from "@prisma/client";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { CommentRepository } from "./comment.repository";

export class CommentPrismaRepository implements CommentRepository {
    constructor(private prisma:PrismaClient) {}
    async execute(createCommentDto: CreateCommentDto):Promise<void> {
        // const comment = await this.prisma.comment.create({
        //     data:createCommentDto
        // })
       return 
    }
}