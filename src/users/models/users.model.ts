import { Model, Table, DataType, Column, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript"
import { Books } from "src/books/models/books.model";
import { Roles } from "./roles.model";

@Table({
    // createdAt: false,
    // updatedAt: false,
    tableName: 'users',
    modelName: 'users',
})
export class Users extends Model<Users> {

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
        allowNull: true,
        unique: false
    })
    full_name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        unique: true
    })
    phone_number: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true
    })
    email: string;

    @ForeignKey(()=> Roles)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        unique: false,
    })
    role_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: false
    })
    password: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        unique: false
    })
    proffit: number;


    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: false
    })
    address: string;


    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        unique: false
    })
    age: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: false,
    })
    cc: string;


    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    active: boolean


    @BelongsTo(()=> Roles)
    roles: Roles[]

    @HasMany(()=> Books)
    books: Books[]
}


