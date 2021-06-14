import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize'
import { Users } from './models/users.model';
import { UsersService } from './users.service';
import { Roles } from './models/roles.model';
import { Apis } from './models/apis.model';
import { Roles_apis } from './models/roles_apis.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Books } from 'src/books/models/books.model';
import { Type } from 'src/books/models/type.model';
import { Categories } from 'src/books/models/categoties.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forFeature([Users, Roles, Apis, Roles_apis, Books, Type, Categories]),
    JwtModule.register({
      secret: process.env.SECRET
    })
  ],
  // exports: [
  //   JwtModule  
  // ]
})
export class UsersModule {}
