import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { Users } from './users/models/users.model';
import { Roles } from './users/models/roles.model';
import { Apis } from './users/models/apis.model';
import { Roles_apis } from './users/models/roles_apis.model';
import { RolesModule } from './roles/roles.module';
import { BooksModule } from './books/books.module';
import { Books } from './books/models/books.model';
import { Type } from './books/models/type.model';
import { Categories } from './books/models/categoties.model';


@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Users, Roles, Apis, Roles_apis, Books, Type, Categories],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    BooksModule,
  ]
})
export class AppModule {}
