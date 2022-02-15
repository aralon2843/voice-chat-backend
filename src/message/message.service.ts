import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { MessageDto } from './dto/message.dto';
import { MessageModel } from './message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(MessageModel)
    private readonly messageModel: ModelType<MessageModel>,
  ) {}

  async createMessage({
    sender,
    dialogId,
    body,
  }: MessageDto): Promise<DocumentType<MessageModel>> {
    const message = new this.messageModel({
      sender,
      dialogId,
      body,
    }).save();

    return message;
  }

  async getMessagesByDialogId(
    dialogId: string,
  ): Promise<DocumentType<MessageModel>[]> {
    const messages = this.messageModel.find({ dialogId });
    if (!messages) {
      throw new NotFoundException(MESSAGES_NOT_FOUND_ERROR);
    }

    return messages;
  }
}
