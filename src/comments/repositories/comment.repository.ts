import { BodyCommentDto } from "../dto/body-comment.dto";
import { UpdateCommentDto } from "../dto/update-comment.dto";
import { Comment } from "../entities/comment.entity";

export abstract class CommentsRepository {
    abstract execute(createCommentDto:BodyCommentDto):Promise<any>;
    abstract findOne(id:string):Promise<Comment>;
    abstract findAll():Promise<Comment[]>;
    abstract updateComment(id:string,updateCommentDto:UpdateCommentDto):Promise<Comment>;
    abstract removeComment(id:string):Promise<Comment>;
}