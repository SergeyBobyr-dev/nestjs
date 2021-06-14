import { Model, Table, DataType, Column, HasMany } from "sequelize-typescript"
import { Books } from "./books.model";

@Table({
    createdAt: false,
    updatedAt: false,
    tableName: 'type',
    modelName: 'type',
})
export class Type extends Model<Type> {

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
        unique: true
    })
    name: string;

    @HasMany(()=> Books)
    books: Books[]

};