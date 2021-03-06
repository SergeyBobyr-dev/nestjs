import { IsEmail, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";



export class CreateUserDto{
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

    @Length(5, 10)
    @IsString()
    readonly password: string;

    @IsNumber()
    readonly age: number;

    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @IsNotEmpty()
    @IsString()
    readonly cc: string;
}