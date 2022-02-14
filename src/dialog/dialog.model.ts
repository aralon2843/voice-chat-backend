import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface DialogModel extends Base {}

export class DialogModel extends TimeStamps {
  @prop({ type: () => [String] })
  members: string[];
}
