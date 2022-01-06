import { RegisterDto } from './dto/register.dto';
import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}

  async createUser({
    email,
    username,
    password,
  }: RegisterDto): Promise<DocumentType<UserModel>> {
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
}
