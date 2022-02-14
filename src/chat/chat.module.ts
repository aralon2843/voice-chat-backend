import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AlertGateway } from './alert.gateway';
import { AlertController } from './alert.controller';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  providers: [ChatGateway, AlertGateway, ChatService],
  controllers: [AlertController, ChatController],
})
export class ChatModule {}
