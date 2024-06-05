import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './ticket.schema';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/CreateTicketDto';
import { ReservationService } from '../reservation/reservation.service';
import { ReservationStatus } from '../reservation/dto/reservationStatus';
import { Projection, ProjectionStatus } from '../projection/projection.schema';
import { ProjectionService } from '../projection/projection.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
    @Inject(forwardRef(() => ReservationService))
    private reservationService: ReservationService,
    @InjectModel(Projection.name) private projectionModel: Model<Projection>,
    private projectionService: ProjectionService,
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

      if (reservation.status !== ReservationStatus.ACTIVE) {
        throw new BadRequestException('Reservation has already been claimed');
      }
      this.reservationService.updateReservationStatus(
        reservation._id.toString(),
        ReservationStatus.COMPLETED,
      );
    }
    const projection = await this.projectionService.getProjection(
      ticketDto.projection,
    );
    if (
      projection.tickets.some(
        (ticket) =>
          (ticket.seatRow === ticketDto.seatRow &&
            ticket.seatNumber === ticketDto.seatNumber) ||
          ticket.seat === ticketDto.seat,
      )
    ) {
      throw new BadRequestException('Seat alrady taken');
    }

    if (projection.status === ProjectionStatus.PROJECTION_ENDED) {
      throw new BadRequestException('Projection has already ended');
    }
    const ticket = await this.ticketModel.create(ticketDto);

    await this.projectionModel.findByIdAndUpdate(ticketDto.projection, {
      $push: { tickets: ticket },
    });

    return ticket;
  }
}
