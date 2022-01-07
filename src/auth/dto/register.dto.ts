import { IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  email: string;

  @MinLength(3)
  @MaxLength(20)
  @IsString()
  username: string;

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  password: string;
}
