import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Apis } from 'src/users/models/apis.model';
import { Roles } from 'src/users/models/roles.model';
import { Roles_apis } from 'src/users/models/roles_apis.model';
import { CreateActionsDto } from './dto/creat-actions.dto';
import { CreateApiDto } from './dto/creat-api.dto';
import { CreateRoleDto } from './dto/creat-role.dto';
import { CreateActionsResponse } from './dto/creatActionsResponse.dto';
import { CreateApiResponse } from './dto/creatApiResponse.dto';
import { CreateRoleResponse } from './dto/creatRoleResponse.dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Roles) private roleRepository,
        @InjectModel(Apis) private apiRepository,
        @InjectModel(Roles_apis) private actionsRepository
    ) { }

    async addRole(dto: CreateRoleDto): Promise<CreateRoleResponse> {
        try {
            const { name } = dto;
            const newRole = await this.roleRepository.create({
                name
            })
            return newRole

        } catch (e) {
            throw new HttpException('Add role faild', HttpStatus.BAD_REQUEST)
        }

    }

    async addApi(dto: CreateApiDto): Promise<CreateApiResponse> {

        try {
            const { name } = dto;
            const newApi = await this.apiRepository.create({
                name
            })
            return newApi
        } catch (e) {
            throw new HttpException('Add api faild', HttpStatus.BAD_REQUEST)
        }
    }

    async addActions(dto: CreateActionsDto): Promise<CreateActionsResponse> {
        try {
            const { role_id, api_id } = dto;
            const newActions = await this.actionsRepository.create({
                role_id, api_id
            })
            return newActions
        } catch (e) {
            throw new HttpException('Add actions faild', HttpStatus.BAD_REQUEST)
        }
    }
}
