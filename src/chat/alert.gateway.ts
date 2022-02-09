import { Server } from 'socket.io';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({ namespace: '/alerts' })
export class AlertGateway {
  @WebSocketServer() wss: Server;

  sendToAll(message: string) {
    this.wss.emit('alertToClient', { type: 'alert', message });
  }
}
