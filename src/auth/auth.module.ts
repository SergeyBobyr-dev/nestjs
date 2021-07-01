import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/models/users.model';
import { Roles } from 'src/users/models/roles.model';
import { Apis } from 'src/users/models/apis.model';
import { Roles_apis } from 'src/users/models/roles_apis.model';
import { Books } from 'src/books/models/books.model';
import { Type } from 'src/books/models/type.model';
import { Categories } from 'src/books/models/categoties.model';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:[
    forwardRef(()=> UsersModule),
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET
    }),
    SequelizeModule.forFeature([Users, Roles, Apis, Roles_apis, Books, Type, Categories]),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
