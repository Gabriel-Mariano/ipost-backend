import { CreateCommentDto } from "../dto/create-comment.dto";

export abstract class CommentRepository {
    abstract execute(createCommentDto:CreateCommentDto):Promise<void>;
}