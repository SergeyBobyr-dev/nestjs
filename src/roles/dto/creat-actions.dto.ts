import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateActionsDto{

    @IsNotEmpty()
    @IsNumber()
    readonly role_id: number;

    @IsNotEmpty()
    @IsNumber()
    readonly api_id: number;
}