import { Controller, Request, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('/auth')
export class AuthController {

  constructor(private authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}