import { IsString, Length } from "class-validator";

export class CreatePostDto {
    // @IsString()
    // id:string;

    @IsString()
    title:string;

    @IsString()
    content?:string;

    @IsString()
    authorId:string;
}
