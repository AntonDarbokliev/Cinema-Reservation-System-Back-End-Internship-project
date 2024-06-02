import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateSelectSeatDto } from './dto/createSelectSeatDto';
import { Server } from 'socket.io';
import { Socket } from 'dgram';

enum SocketEvent {
  CONNECT = 'establishConnection',
  DISCONNECT = 'disconnect',
  SET_SEAT = 'setSeat',
  ERROR = 'err',
}

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class ReservationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected');
    client.emit(SocketEvent.CONNECT); // Emit to the specific connected client
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client);
    this.server.emit(SocketEvent.DISCONNECT);
  }

  @SubscribeMessage('selectSeat')
  selectSeat(@MessageBody() body: CreateSelectSeatDto) {
    console.log(body);
    this.server.emit('selectSeat', body);
  }
}
