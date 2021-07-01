import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly year_of_production: number;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsNumber()
    readonly category_id: number;

    @IsNotEmpty()
    @IsNumber()
    readonly rate: number;

    @IsNotEmpty()
    @IsNumber()
    readonly user_id: number;

    @IsNotEmpty()
    @IsNumber()
    readonly type_id: number;
}