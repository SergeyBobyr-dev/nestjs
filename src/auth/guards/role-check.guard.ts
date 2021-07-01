import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { Apis } from "src/users/models/apis.model";
import { Roles_apis } from "src/users/models/roles_apis.model";
import { Users } from "src/users/models/users.model";

@Injectable()
export class RoleCheckGuard implements CanActivate {

    constructor(private jwtService: JwtService,
        @InjectModel(Users) private userRepository,
        @InjectModel(Roles_apis) private rolesApisRepository,
        @InjectModel(Apis) private apisRepository) {

    }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req = context.switchToHttp().getRequest()

        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];

        const userId = this.jwtService.verify(token).id

        const { role_id: userRoleId } = await this.userRepository.findOne({
            where: { id: userId }
        })



        const { api_id: apiId } = await this.rolesApisRepository.findOne({
            where: { role_id: userRoleId }
        })

        const { name: apiName } = await this.apisRepository.findOne({
            where: { id: apiId }
        })

        if (apiName === req.url)
            return true
    }

}