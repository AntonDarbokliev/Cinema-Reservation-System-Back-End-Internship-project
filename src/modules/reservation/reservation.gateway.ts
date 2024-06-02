import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateSelectSeatDto } from './dto/createSelectSeatDto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ReservationGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('selectSeat')
  selectSeat(@MessageBody() body: CreateSelectSeatDto) {
    console.log(body);
    this.server.emit('selectSeat', body);
  }
}
