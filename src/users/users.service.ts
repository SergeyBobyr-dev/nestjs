import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './models/users.model';
import * as bcrypt from 'bcryptjs';
import { Roles } from './models/roles.model';

import { GetTokenDto } from './dto/get-token.dto';
import { CreateUserResponse } from './dto/createUserResponse.dto';
import { EmailService } from 'src/share/email/email.service';


@Injectable()
export class UsersService {
    models: any;
    constructor(@InjectModel(Users) private userRepository,
    @InjectModel(Roles) private rolesRepository,
        private jwtService: JwtService,
        private emailService: EmailService) {

    }


    async registration(dto: CreateUserDto): Promise<CreateUserResponse> {
        try {
            const { full_name, phone_number, email, role_id, password, age, address, cc } = dto;

        const checkPhone = await this.userRepository.findOne({
            where: { phone_number }
        })

        const checkEmail = await this.userRepository.findOne({
            where: { email }
        })


        if (checkPhone) {
            throw new HttpException('User with such phone number already exists', HttpStatus.BAD_REQUEST)
        }
        if (checkEmail) {
            throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST)

        }


        const hashPassword = bcrypt.hashSync(dto.password, 7);
        const hashCc = bcrypt.hashSync(dto.cc, 7);

        const newPerson = await this.userRepository.create({
            full_name, phone_number, email, role_id, password: hashPassword, age, address, cc: hashCc
        })
        
        
        
        const token = this.jwtService.sign({ email: newPerson.email, id: newPerson.id })
        
        const message = {
            from: '"Book keeping" <verda.christiansen22@ethereal.email>',
            to: dto.email,
            subject: "Confirm email",
            text: `http://localhost:3000/confirmation/${token}`
        }

        this.emailService.mailer(message)

        return newPerson
        } catch (e) {
            throw new HttpException('Registration faild', HttpStatus.BAD_REQUEST)
        }
    }

    async authEmail(param: GetTokenDto): Promise<string> {
        try {
            const decodedId = this.jwtService.verify(param.token).id

        const checkId = await this.userRepository.findOne({
            where: { id: decodedId }
        })


        if (checkId) {
            await this.userRepository.update({ active: true }, { where: { id: decodedId } })
            return "user authenticated"
        }
            
        } catch (e) {
            throw new HttpException('Wrong token', HttpStatus.BAD_REQUEST)
        }
    }

    async getUserByEmail(dto: string): Promise<Users> | undefined  {
        
        try {
            
            const checkEmail = await this.userRepository.findOne({
                where: { email: dto}
            })
            if(!checkEmail){
                throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
            }
            return checkEmail
        } catch (e) {
            return e
        }
    }


    async getAllUsers(): Promise<Users[]> | undefined {
        try {
            const users = this.userRepository.findAll(
                { 
                    include: {model: this.rolesRepository}
                }
            )
            if(!users){
                throw new HttpException('users not found', HttpStatus.BAD_REQUEST)
            }
            return users
            
        } catch (e) {
            return e
        }
    }
}
