export class CreateUserResponse{
    readonly id: number;
    readonly full_name: string;
    readonly phone_number: number;
    readonly email: string;
    readonly role_id: number;
    readonly password: string;
    readonly age: number;
    readonly address: string;
    readonly cc: string;
    readonly active: boolean;
    readonly proffit?: number;
    readonly updatedAt: string;
    readonly createdAt: string;
}