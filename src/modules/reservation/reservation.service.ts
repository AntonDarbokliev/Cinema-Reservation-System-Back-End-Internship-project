import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './reservation.schema';
import { getCurrentDateTime } from './utils/getCurrentDateTime';
import { CreateReservationDto } from './dto/createReservationDto';
import { ReservationStatus } from './dto/reservationStatus';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel('Reservation') private reservationModel: Model<Reservation>,
  ) {}

  async getProjectionReservations(projectionId: string) {
    return await this.reservationModel.find({ projection: projectionId });
  }

  async getSingleReservation(reservationId: string) {
    return await this.reservationModel
      .findById(reservationId)
      .populate('projection')
      .populate('seat');
  }

  async createReservation(dto: CreateReservationDto) {
    const reservations = await this.getProjectionReservations(dto.projection);
    if (
      reservations.some(
        (reservation) =>
          (reservation.seatRow === dto.seatRow &&
            reservation.seatNumber === dto.seatNumber) ||
          reservation.seat._id === dto.seat,
      )
    ) {
      throw new BadRequestException('Seat already reserved');
    }
    return await this.reservationModel.create(dto);
  }

  async updateReservationStatus(
    reservationId: string,
    newStatus: ReservationStatus,
  ) {
    return await this.reservationModel.findByIdAndUpdate(reservationId, {
      status: newStatus,
    });
  }

  async cancelReservation(reservationId: string) {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const reservation = await this.getSingleReservation(reservationId);
    const timeDate = await getCurrentDateTime();
    timeDate.dateTime.getTime();
    if (
      reservation.projection.startDate.getTime() - timeDate.dateTime.getTime() >
      oneDayInMilliseconds
    ) {
      return await this.reservationModel.findByIdAndDelete(reservationId);
    } else {
      throw new BadRequestException(
        'Cannot cancel reservation later than one day in advance',
      );
    }
  }
}
