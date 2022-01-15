import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface PostModel extends Base {}

export class PostModel extends TimeStamps {
  @prop()
  authorId: Types.ObjectId;

  @prop()
  body: string;

  @prop({ type: () => [String] })
  comments: string[];

  @prop({ type: () => [String] })
  likes: string[];
}
