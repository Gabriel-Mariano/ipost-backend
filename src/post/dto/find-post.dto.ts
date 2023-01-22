import { IsString } from "class-validator";

export class FindPostDto {
    @IsString()
    title:string
}