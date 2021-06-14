import { Body, Controller, Post } from '@nestjs/common';
import { CreateActionsDto } from './dto/creat-actions.dto';
import { CreateRoleDto } from './dto/creat-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService){}

    @Post('/addrole')
    addrole(@Body() roleDto: CreateRoleDto){
       
        return this.rolesService.addRole(roleDto)
    }

    @Post('/addapi')
    addapi(@Body() apiDto: CreateRoleDto){
       
        return this.rolesService.addApi(apiDto)
    }

    @Post('/addactions')
    addactions(@Body() actionsDto: CreateActionsDto){
       
        return this.rolesService.addActions(actionsDto)
    }
}
