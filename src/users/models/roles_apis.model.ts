import { Model, Table, DataType, Column, ForeignKey } from "sequelize-typescript"
import { Apis } from "./apis.model";
import { Roles } from "./roles.model";

@Table({
    createdAt: false,
    updatedAt: false,
    tableName: 'roles_apis',
    modelName: 'roles_apis',
})
export class Roles_apis extends Model<Roles_apis> {

    @ForeignKey(()=> Roles)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: false,
    })
    role_id: number;

    @ForeignKey(()=> Apis)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    })
    api_id: number;

};