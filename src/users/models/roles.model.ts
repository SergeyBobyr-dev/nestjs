import { Model, Table, DataType, Column, HasMany, BelongsToMany } from "sequelize-typescript"
import { Apis } from "./apis.model";
import { Roles_apis } from "./roles_apis.model";
import { Users } from "./users.model";

@Table({
    createdAt: false,
    updatedAt: false,
    tableName: 'roles',
    modelName: 'roles',
})
export class Roles extends Model<Roles> {

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
        unique: true
    })
    name: string;

    @BelongsToMany(()=> Apis, () => Roles_apis)
    apis: Apis[]

    @HasMany(()=> Users)
    users: Users[]

};