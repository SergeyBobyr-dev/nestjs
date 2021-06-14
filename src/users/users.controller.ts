import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RoleCheckGuard } from 'src/roles/role-check.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
       
        return this.usersService.registration(userDto)
    }

    @Post('/login')
    login(@Body() userDto: LoginUserDto){
       
        return this.usersService.login(userDto)
    }

    @UseGuards(RoleCheckGuard)
    @UseGuards(JwtAuthGuard)
    @Get('/users')
    getAll(){
        return this.usersService.getAllUsers()
    }

    @Get('/confirmation/:token')
    activate(@Param() param){
        return this.usersService.authEmail(param)
    }
}
