import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/chat' })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');

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
  handleMessage(
    client: Socket,
    message: { sender: string; dialog: string; body: string },
  ) {
    console.log(message);
    this.wss.to(message.dialog).emit('messageToClient', message.body);
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
