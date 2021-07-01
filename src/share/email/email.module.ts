import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Books } from 'src/books/models/books.model';
import { Categories } from 'src/books/models/categoties.model';
import { Type } from 'src/books/models/type.model';
import { Apis } from 'src/users/models/apis.model';
import { Roles } from 'src/users/models/roles.model';
import { Roles_apis } from 'src/users/models/roles_apis.model';
import { Users } from 'src/users/models/users.model';
import { EmailService } from './email.service';


@Module({
  controllers: [],
  providers: [EmailService],
  imports: [
    SequelizeModule.forFeature([Users, Roles, Apis, Roles_apis, Books, Type, Categories]),
    JwtModule.register({
        secret: process.env.SECRET
      })
  ],
  exports: [EmailService]
})
export class EmailModule {}