import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class GetUserDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;
}