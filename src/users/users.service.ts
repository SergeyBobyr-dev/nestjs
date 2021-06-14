import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './models/users.model';
import * as bcrypt from 'bcryptjs';
import { mailer } from '../nodemailer';
import { LoginUserDto } from './dto/login-user.dto';
import { Roles } from './models/roles.model';

@Injectable()
export class UsersService {
    models: any;
    constructor(@InjectModel(Users) private userRepository,
    @InjectModel(Roles) private rolesRepository,
        private jwtService: JwtService) {

    }


    async registration(dto: CreateUserDto) {

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

        const token = this.jwtService.sign({ id: newPerson.id })

        const message = {
            from: '"Book keeping" <verda.christiansen22@ethereal.email>',
            to: dto.email,
            subject: "Confirm email",
            text: `http://localhost:3000/confirmation/${token}`
        }

        mailer(message)

        return newPerson
    }


    async login(dto: LoginUserDto) {

       
        const { email, password } = dto;

        const user = await this.userRepository.findOne({
            where: { email: email }
        })


        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST)
        }

       
        
        return this.jwtService.sign({id: user.id})
    }


    async authEmail(param) {

        const decodedId = this.jwtService.verify(param.token).id

        const checkId = await this.userRepository.findOne({
            where: { id: decodedId }
        })


        if (checkId) {
            await this.userRepository.update({ active: true }, { where: { id: decodedId } })
            return "user authenticated"
        }


    }

    async getAllUsers() {
        const users = this.userRepository.findAll(
            { 
                include: {model: this.rolesRepository}
            }
        )
        return users
    }
}
