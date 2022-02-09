import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AlertGateway } from './alert.gateway';
import { AlertController } from './alert.controller';

@Module({
  providers: [ChatGateway, AlertGateway],
  controllers: [AlertController]
})
export class ChatModule {}
