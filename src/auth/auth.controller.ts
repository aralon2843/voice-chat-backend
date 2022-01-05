import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  async regiser(@Body() dto: RegisterDto) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {}
}
