import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './reservation.schema';
import { getCurrentDateTime } from './utils/getCurrentDateTime';
import { CreateReservationDto } from './dto/createReservationDto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel('Reservation') private reservationModel: Model<Reservation>,
  ) {}

  async getSingleReservation(reservationId: string) {
    return await this.reservationModel
      .findById(reservationId)
      .populate('projection')
      .populate('seat');
  }

  async createReservation(dto: CreateReservationDto) {
    return await this.reservationModel.create(dto);
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
      throw new Error(
        'Cannot cancel reservation later than one day in advance',
      );
    }
  }
}
