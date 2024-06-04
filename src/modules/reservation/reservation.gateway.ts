import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

enum SocketEvent {
  CONNECT = 'establishConnection',
  DISCONNECT = 'disconnectSocket',
  SET_SEAT = 'setSeat',
  UNSET_SEAT = 'unsetSeat',
  RESERVE_SEAT = 'reserveSeat',
  BUY_SEAT = 'buySeat',
  ERROR = 'err',
}

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
  },
})
export class ReservationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('Client connected', client.id);
    client.emit(SocketEvent.CONNECT);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected', client.id);

    client.emit(SocketEvent.DISCONNECT);
  }

  @SubscribeMessage(SocketEvent.SET_SEAT)
  selectSeat(@MessageBody() body: any) {
    console.log(body);
    this.server.emit(SocketEvent.SET_SEAT, body);
  }

  @SubscribeMessage(SocketEvent.UNSET_SEAT)
  unselectSeat(@MessageBody() body: any) {
    console.log(body);
    this.server.emit(SocketEvent.UNSET_SEAT, body);
  }

  @SubscribeMessage(SocketEvent.RESERVE_SEAT)
  reserveSeat(@MessageBody() body: any) {
    console.log(body);
    this.server.emit(SocketEvent.RESERVE_SEAT, body);
  }

  @SubscribeMessage(SocketEvent.BUY_SEAT)
  buySeat(@MessageBody() body: any) {
    console.log(body);
    this.server.emit(SocketEvent.BUY_SEAT, body);
  }
}
