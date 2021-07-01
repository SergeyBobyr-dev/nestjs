import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize'
import { Users } from './models/users.model';
import { UsersService } from './users.service';
import { Roles } from './models/roles.model';
import { Apis } from './models/apis.model';
import { Roles_apis } from './models/roles_apis.model';
import { JwtModule } from '@nestjs/jwt';
import { Books } from 'src/books/models/books.model';
import { Type } from 'src/books/models/type.model';
import { Categories } from 'src/books/models/categoties.model';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from 'src/share/email/email.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, EmailService],
  imports: [
   
  forwardRef(() => AuthModule),
  ConfigModule.forRoot({
    envFilePath: '.env'
  }),
  SequelizeModule.forFeature([Users, Roles, Apis, Roles_apis, Books, Type, Categories]),
  JwtModule.register({
    secret: process.env.SECRET
  })
  ],
  exports: [UsersService]
})
export class UsersModule { }
