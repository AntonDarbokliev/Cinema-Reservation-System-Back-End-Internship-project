import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Ticket } from '../ticket/ticket.schema';
import { Seat } from '../hall/hall.schema';
import { GetReservation } from './dto/getReservationDto';

enum SocketEvent {
  CONNECT = 'establishConnection',
  DISCONNECT = 'disconnectSocket',
  SET_SEAT = 'setSeat',
  UNSET_SEAT = 'unsetSeat',
  RESERVE_SEAT = 'reserveSeat',
  UNRESERVE_SEAT = 'unreserveSeat',
  BUY_SEAT = 'buySeat',
  ERROR = 'err',
}

interface SocketSeat extends Seat {
  projectionId: string;
}

interface SocketState {
  isConnected: boolean;
  seats: SocketSeat[];
  reservations: GetReservation[];
  tickets: Ticket[];
}

const sharedState: SocketState = {
  isConnected: false,
  seats: [],
  reservations: [],
  tickets: [],
};

let connectedClients = 0;

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:4200',
    ],
  },
})
export class ReservationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    connectedClients++;
    client.emit(SocketEvent.CONNECT, sharedState);
  }

  handleDisconnect(client: any) {
    connectedClients--;
    if (connectedClients === 0) {
      sharedState.reservations = [];
      sharedState.tickets = [];
      sharedState.seats = [];
      sharedState.isConnected = false;
    }
    client.emit(SocketEvent.DISCONNECT);
  }

  @SubscribeMessage(SocketEvent.SET_SEAT)
  selectSeat(@MessageBody() body: any) {
    sharedState.seats.push(body);
    this.server.emit(SocketEvent.SET_SEAT, body);
  }

  @SubscribeMessage(SocketEvent.UNSET_SEAT)
  unselectSeat(@MessageBody() body: any) {
    sharedState.seats = sharedState.seats.filter(
      (seat) => seat.projectionId !== body.projectionId,
    );
    this.server.emit(SocketEvent.UNSET_SEAT, body);
  }

  @SubscribeMessage(SocketEvent.RESERVE_SEAT)
  reserveSeat(@MessageBody() body: GetReservation) {
    sharedState.reservations.push(body);
    this.server.emit(SocketEvent.RESERVE_SEAT, body);
  }

  @SubscribeMessage(SocketEvent.UNRESERVE_SEAT)
  unreserveSeat(@MessageBody() reservationId: string) {
    sharedState.reservations = sharedState.reservations.filter(
      (reservation) => reservation._id !== reservationId,
    );

    this.server.emit(SocketEvent.UNRESERVE_SEAT, reservationId);
  }

  @SubscribeMessage(SocketEvent.BUY_SEAT)
  buySeat(@MessageBody() body: any) {
    sharedState.tickets.push(body);
    this.server.emit(SocketEvent.BUY_SEAT, body);
  }
}
