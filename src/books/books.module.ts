import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/models/users.model';
import { Roles } from 'src/users/models/roles.model';
import { Apis } from 'src/users/models/apis.model';
import { Roles_apis } from 'src/users/models/roles_apis.model';
import { Books } from './models/books.model';
import { Type } from './models/type.model';
import { Categories } from './models/categoties.model';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    SequelizeModule.forFeature([Users, Roles, Apis, Roles_apis, Books, Type, Categories])
  ]
})
export class BooksModule {}
