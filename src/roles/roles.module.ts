import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Apis } from 'src/users/models/apis.model';
import { Roles } from 'src/users/models/roles.model';
import { Roles_apis } from 'src/users/models/roles_apis.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forFeature([Roles, Apis, Roles_apis])
  ]
})
export class RolesModule {}
