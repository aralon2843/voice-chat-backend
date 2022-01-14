import { RegisterDto } from './dto/register.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from '../user/user.model';
import { compare, genSalt, hash } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser({
    email,
    username,
    password,
  }: RegisterDto): Promise<
    DocumentType<Pick<UserModel, 'email' | 'username' | 'passwordHash'>>
  > {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email,
      username,
      passwordHash: await hash(password, salt),
    });
    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<DocumentType<UserModel>> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findUserByUsername(username: string): Promise<DocumentType<UserModel>> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Pick<UserModel, 'username'>> {
    const user = await this.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isPasswordCorrect = await compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return {
      username: user.username,
    };
  }
  async login(username: string) {
    const payload = { username };
    const user = await this.findUserByUsername(username);
    return {
      access_token: await this.jwtService.signAsync(payload),
      id: user.id,
      username,
    };
  }
}
