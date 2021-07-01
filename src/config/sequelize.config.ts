import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Books } from "src/books/models/books.model";
import { Categories } from "src/books/models/categoties.model";
import { Type } from "src/books/models/type.model";
import { Apis } from "src/users/models/apis.model";
import { Roles } from "src/users/models/roles.model";
import { Roles_apis } from "src/users/models/roles_apis.model";
import { Users } from "src/users/models/users.model";

export const sequelizeConfig: SequelizeModuleOptions = {

    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    models: [Users, Roles, Apis, Roles_apis, Books, Type, Categories],
    autoLoadModels: true
}