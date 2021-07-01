import { IsNumber } from "class-validator";

export class RemoveBookDto{

    @IsNumber()
    readonly id: number;
}