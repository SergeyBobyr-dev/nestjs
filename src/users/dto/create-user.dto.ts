export class CreateUserDto{
    readonly full_name: string;
    readonly phone_number: number;
    readonly email: string;
    readonly role_id: number;
    readonly password: string;
    readonly age: number;
    readonly address: string;
    readonly cc: string;
}