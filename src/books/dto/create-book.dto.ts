export class CreateBookDto{
    readonly name: string;
    readonly author: string;
    readonly description: string;
    readonly year_of_production: number;
    readonly price: number;
    readonly category_id: number;
    readonly rate: number;
    readonly user_id: number;
    readonly type_id: number;
}