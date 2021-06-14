import { Model, Table, DataType, Column, BelongsToMany } from "sequelize-typescript"
import { Roles } from "./roles.model";
import { Roles_apis } from "./roles_apis.model";

@Table({
    createdAt: false,
    updatedAt: false,
    tableName: 'apis',
    modelName: 'apis',
})
export class Apis extends Model<Apis> {

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

    @BelongsToMany(()=> Roles, () => Roles_apis)
    roles: Roles[]

};