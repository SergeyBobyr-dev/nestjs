import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Apis } from 'src/users/models/apis.model';
import { Roles } from 'src/users/models/roles.model';
import { Roles_apis } from 'src/users/models/roles_apis.model';
import { CreateActionsDto } from './dto/creat-actions.dto';
import { CreateRoleDto } from './dto/creat-role.dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Roles) private roleRepository,
                @InjectModel(Apis) private apiRepository,
                @InjectModel(Roles_apis) private actionsRepository
    ) { }

    async addRole(dto: CreateRoleDto) {

        const { name } = dto;
        const newRole = await this.roleRepository.create({
            name
        })
        return newRole
    }

    async addApi(dto: CreateRoleDto) {

        const { name } = dto;
        const newApi = await this.apiRepository.create({
            name
        })
        return newApi
    }

    async addActions(dto: CreateActionsDto) {

        const { role_id, api_id } = dto;
        const newActions = await this.actionsRepository.create({
            role_id, api_id
        })
        return newActions
    }
}
