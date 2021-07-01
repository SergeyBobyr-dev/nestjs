import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<UserDto> | null {
        
        const user = await this.usersService.getUserByEmail(email);

        const validPassword = bcrypt.compareSync(pass, user.password)

        if (user && validPassword) {
            const { password, cc, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
