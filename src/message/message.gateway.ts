import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true, namespace: '/message' })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly messageService: MessageService) {}
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('MessageGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('messageToServer')
  async handleMessage(
    client: Socket,
    message: { sender: string; dialogId: string; body: string },
  ) {
    console.log(message);
    const sendedMessage = await this.messageService.createMessage(message);
    console.log(sendedMessage.createdAt)
    this.wss.to(message.dialogId).emit('messageToClient', sendedMessage);
  }

  @SubscribeMessage('joinDialog')
  handleJoinDialog(client: Socket, dialog: string) {
    console.log(client.id + ' joined dialog ' + dialog);
    client.join(dialog);
    client.emit('Joined dialog', dialog);
  }

  @SubscribeMessage('leaveDialog')
  handleLeaveDialog(client: Socket, dialog: string) {
    console.log(client.id + ' left dialog ' + dialog);
    client.leave(dialog);
    client.emit('Left dialog', dialog);
  }
}
