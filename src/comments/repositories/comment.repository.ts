import { CreateCommentDto } from "../dto/create-comment.dto";
import { Comment } from "../entities/comment.entity";

export abstract class CommentsRepository {
    abstract execute(createCommentDto:CreateCommentDto):Promise<Comment>;
}