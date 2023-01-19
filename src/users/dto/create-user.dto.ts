import { IsEmail, Length, IsString } from 'class-validator'

export class CreateUserDto {
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @Length(4)
    password:string;
}
