import { IsNotEmpty, IsString } from "class-validator";

export class CreateApiDto{

    @IsNotEmpty()
    @IsString()
    readonly name: string;
}