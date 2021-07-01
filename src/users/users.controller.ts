import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { GetUserDto } from './dto/get-user.dto';
import { GetTokenDto } from './dto/get-token.dto';
import { CreateUserResponse } from './dto/createUserResponse.dto';
import { Users } from './models/users.model';
import { RoleCheckGuard } from 'src/auth/guards/role-check.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @UsePipes(new ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto): Promise<CreateUserResponse>{
        return this.usersService.registration(userDto)
    }

    @UseGuards(RoleCheckGuard)
    @UseGuards(JwtAuthGuard)
    @Get('/allusers')
    getAll(): Promise<Users[]>{
        return this.usersService.getAllUsers()
    }

    @UsePipes(new ValidationPipe)
    @Post('/getuserbyemail')
    getUserByEmail(@Body() dto: GetUserDto): Promise<Users>{
        const {email} = dto
        return this.usersService.getUserByEmail(email)
    }

    @UsePipes(new ValidationPipe)
    @Get('/confirmation/:token')
    activate(@Param() param: GetTokenDto): Promise<string>{
        return this.usersService.authEmail(param)
    }
}
