import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './ticket.schema';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/CreateTicketDto';
import { ReservationService } from '../reservation/reservation.service';
import { ReservationStatus } from '../reservation/dto/reservationStatus';
import { Projection } from '../projection/projection.schema';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
    private reservationService: ReservationService,
    @InjectModel(Projection.name) private projectionModel: Model<Projection>,
  ) {}

  async getTicketsForProjection(projectionId: string) {
    return await this.ticketModel.find({ projection: projectionId });
  }

  async createTicket(ticketDto: CreateTicketDto) {
    if (ticketDto.reservaton) {
      const reservation = await this.reservationService.getSingleReservation(
        ticketDto.reservaton,
      );

      if (!reservation) {
        throw new BadRequestException('Reservation not found');
      }

      if (reservation.status !== ReservationStatus.RESERVED) {
        throw new BadRequestException('Reservation has already been claimed');
      }
      this.reservationService.updateReservationStatus(
        reservation._id.toString(),
        ReservationStatus.COMPLETED,
      );
    }
    const tickets = await this.getTicketsForProjection(ticketDto.projection);
    if (
      tickets.some(
        (ticket) =>
          (ticket.seatRow === ticketDto.seatRow &&
            ticket.seatNumber === ticketDto.seatNumber) ||
          ticket.seat === ticketDto.seat,
      )
    ) {
      throw new BadRequestException('Seat alrady taken');
    }

    const ticket = await this.ticketModel.create(ticketDto);

    await this.projectionModel.findByIdAndUpdate(ticketDto.projection, {
      $push: { tickets: ticket },
    });

    return ticket;
  }
}
