import { Model, Table, DataType, Column, ForeignKey, BelongsTo } from "sequelize-typescript"
import { Users } from "src/users/models/users.model";
import { Categories } from "./categoties.model";
import { Type } from "./type.model";


@Table({
    createdAt: false,
    updatedAt: false,
    tableName: 'books',
    modelName: 'books',
})
export class Books extends Model<Books> {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: false
    })
    name: string;


    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: false
    })
    author: string;

    
    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: false
    })
    description: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: false
    })
    year_of_production: string;


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: false
    })
    price: string;

    @ForeignKey(()=> Categories)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        unique: false
    })
    category_id: string;


    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        unique: false
    })
    rate: string;


    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        unique: false
    })
    revenue: string;
    

    @ForeignKey(()=> Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        unique: false
    })
    user_id: string;


    @ForeignKey(()=> Type)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        unique: false
    })
    type_id: string;

    
    @BelongsTo(()=> Users)
    users: Users[]

    @BelongsTo(()=> Categories)
    categories: Categories[]

    @BelongsTo(()=> Type)
    type: Type[]

};