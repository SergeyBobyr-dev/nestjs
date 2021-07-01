import { IsNumber, IsNotEmpty, IsString, IsEmail } from "class-validator";

export class UserDto{

    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly full_name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly phone_number: number;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNumber()
    readonly role_id: number;
    
    @IsNumber()
    readonly age: number;

    @IsString()
    readonly address: string;
}