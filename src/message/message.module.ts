import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { MessageGateway } from './message.gateway';
import { MessageModel } from './message.model';
import { MessageService } from './message.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MessageModel,
        schemaOptions: {
          collection: 'Message',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
