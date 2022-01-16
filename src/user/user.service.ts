import {
  CANNOT_FOLLOW_YOURSELF_ERROR,
  CANNOT_UNFOLLOW_YOURSELF_ERROR,
  USER_ALREADY_FOLLOWED_ERROR,
  USER_NOT_FOUND_ERROR,
  YOU_DONT_FOLLOW_THIS_USER_ERROR,
} from './user.constants';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}

  async follow(
    currentId: string,
    userId: string,
  ): Promise<DocumentType<UserModel>> {
    const currentUser = await this.userModel.findById(currentId);
    const user = await this.userModel.findById(userId);

    if (currentId === userId) {
      throw new BadRequestException(CANNOT_FOLLOW_YOURSELF_ERROR);
    }

    if (!currentUser.followers.includes(userId)) {
      await currentUser.updateOne({ $push: { followers: userId } });
      await user.updateOne({ $push: { followings: currentId } });
    } else {
      throw new BadRequestException(USER_ALREADY_FOLLOWED_ERROR);
    }

    return currentUser;
  }

  async unfollow(
    currentId: string,
    userId: string,
  ): Promise<DocumentType<UserModel>> {
    const currentUser = await this.userModel.findById(currentId);
    const user = await this.userModel.findById(userId);

    if (currentId === userId) {
      throw new BadRequestException(CANNOT_UNFOLLOW_YOURSELF_ERROR);
    }

    if (user.followers.includes(currentId)) {
      await user.updateOne({ $pull: { followers: currentId } });
      await currentUser.updateOne({ $pull: { followings: userId } });
    } else {
      throw new BadRequestException(YOU_DONT_FOLLOW_THIS_USER_ERROR);
    }

    return currentUser;
  }

  async getUser(id: string): Promise<DocumentType<UserModel>> {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new NotFoundException(USER_NOT_FOUND_ERROR);
      }

      return user;
    }

    throw new NotFoundException(USER_NOT_FOUND_ERROR);
  }

  async getAllUsers(id: string): Promise<DocumentType<UserModel>[]> {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      return this.userModel.find({ _id: { $ne: id } }).exec();
    }
    throw new NotFoundException(USER_NOT_FOUND_ERROR);
  }
}
