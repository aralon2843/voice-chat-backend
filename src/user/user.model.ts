import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop({ unique: true })
  username: string;

  @prop()
  passwordHash: string;

  @prop({ default: null })
  profilePicture: string;

  @prop({ type: () => [String] })
  followers: string[];

  @prop({ type: () => [String] })
  followings: string[];

  @prop({ default: null })
  city: string;

  @prop({ default: null })
  description: string;
}
