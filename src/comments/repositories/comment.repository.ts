import { BodyCommentDto } from "../dto/body-comment.dto";
import { Comment } from "../entities/comment.entity";

export abstract class CommentsRepository {
    abstract execute(createCommentDto:BodyCommentDto):Promise<any>;
}