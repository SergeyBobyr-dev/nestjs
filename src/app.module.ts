import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './share/email/email.module';
import { sequelizeConfig } from './config/sequelize.config';



@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot(sequelizeConfig),
    UsersModule,
    RolesModule,
    BooksModule,
    AuthModule,
    EmailModule,
  ]
})
export class AppModule {}
