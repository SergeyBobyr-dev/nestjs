import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateActionsDto } from './dto/creat-actions.dto';
import { CreateApiDto } from './dto/creat-api.dto';
import { CreateRoleDto } from './dto/creat-role.dto';
import { CreateActionsResponse } from './dto/creatActionsResponse.dto';
import { CreateApiResponse } from './dto/creatApiResponse.dto';
import { CreateRoleResponse } from './dto/creatRoleResponse.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService){}

    @UsePipes(new ValidationPipe)
    @Post('/addrole')
    addrole(@Body() roleDto: CreateRoleDto): Promise<CreateRoleResponse>{
       
        return this.rolesService.addRole(roleDto)
    }

    @UsePipes(new ValidationPipe)
    @Post('/addapi')
    addapi(@Body() apiDto: CreateApiDto): Promise<CreateApiResponse> {
       
        return this.rolesService.addApi(apiDto)
    }

    @UsePipes(new ValidationPipe)
    @Post('/addactions')
    addactions(@Body() actionsDto: CreateActionsDto): Promise<CreateActionsResponse>{
       
        return this.rolesService.addActions(actionsDto)
    }
}
