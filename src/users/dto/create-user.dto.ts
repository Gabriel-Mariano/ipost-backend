import { IsEmail, Min } from 'class-validator'

export class CreateUserDto {
    // without validation
    name:string;

    @IsEmail()
    email:string;

    @Min(6)
    password:string;
}
