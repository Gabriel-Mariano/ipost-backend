import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class BodyCommentDto extends PartialType(CreateCommentDto) {
    authorId:string
}