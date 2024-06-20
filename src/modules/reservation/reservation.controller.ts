import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/createReservationDto';
import { Public } from '../auth/decorator';

@Controller('reservations')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Get(':reservationId')
  async getReservation(@Param('reservationId') reservationId: string) {
    return await this.reservationService.getSingleReservation(reservationId);
  }

  @Public()
  @Post()
  async createReservation(@Body() dto: CreateReservationDto) {
    const reservation = await this.reservationService.createReservation(dto);

    return reservation;
  }

  @Post(':reservationId/cancel')
  async cancelReservation(@Param('reservationId') reservationId: string) {
    return await this.reservationService.cancelReservation(reservationId);
  }
}
