import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/createReservationDto';
import { InjectModel } from '@nestjs/mongoose';
import { Projection } from '../projection/projection.schema';
import { Model } from 'mongoose';

@Controller('reservations')
export class ReservationController {
  constructor(
    private reservationService: ReservationService,
    @InjectModel(Projection.name) private projectionModel: Model<Projection>,
  ) {}

  @Get(':reservationId')
  async getReservation(@Param('reservationId') reservationId: string) {
    return await this.reservationService.getSingleReservation(reservationId);
  }

  @Post()
  async createReservation(@Body() dto: CreateReservationDto) {
    const reservation = await this.reservationService.createReservation(dto);
    await this.projectionModel.findByIdAndUpdate(reservation.projection, {
      $push: {
        reservations: reservation._id,
      },
    });
    return reservation;
  }

  @Post(':reservationId/cancel')
  async cancelReservation(@Param('reservationId') reservationId: string) {
    return await this.reservationService.cancelReservation(reservationId); // TODO: Don't actually delete it. Change it's status.
  }
}
