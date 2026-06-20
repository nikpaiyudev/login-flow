import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {

    @IsString()
    @IsEmail()
    emailId: string;

    @IsString()
    password: string;

}