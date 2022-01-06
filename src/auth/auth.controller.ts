import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ALREADY_REGISTERED_EMAIL_ERROR,
  ALREADY_REGISTERED_USERNAME_ERROR,
} from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async regiser(@Body() dto: RegisterDto) {
    const email = await this.authService.findUserByEmail(dto.email);
    const username = await this.authService.findUserByUsername(dto.username);

    if (email) {
      throw new BadRequestException(ALREADY_REGISTERED_EMAIL_ERROR);
    }
    if (username) {
      throw new BadRequestException(ALREADY_REGISTERED_USERNAME_ERROR);
    }

    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(
      dto.username,
      dto.password,
    );

    return this.authService.login(user.username);
  }
}
