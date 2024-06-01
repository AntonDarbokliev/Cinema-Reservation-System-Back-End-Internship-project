import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './reservation.schema';
import { CreateReservationDto } from './dto/createReservationDto';
import { ReservationStatus } from './dto/reservationStatus';
import { ProjectionService } from '../projection/projection.service';
import { ProjectionStatus } from '../projection/projection.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel('Reservation') private reservationModel: Model<Reservation>,
    private projectionService: ProjectionService,
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
    const reservationProjection = await this.projectionService.getProjection(
      dto.projection,
    );
    // const reservations = await this.getProjectionReservations(dto.projection);
    if (
      reservationProjection.reservations.some(
        (reservation) =>
          ((reservation.seatRow === dto.seatRow &&
            reservation.seatNumber === dto.seatNumber) ||
            reservation.seat._id === dto.seat) &&
          reservation.status === ReservationStatus.ACTIVE,
      )
    ) {
      throw new BadRequestException('Seat already reserved');
    }

    if (
      reservationProjection.status !== ProjectionStatus.PROJECTION_SCHEDULED
    ) {
      throw new BadRequestException('Too late to reserve a seat');
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

    const currentTime = new Date();
    const localOffset = Number(process.env.UTC_TIME_OFFSET);

    if (localOffset < 0) {
      currentTime.setHours(currentTime.getHours() + Math.abs(localOffset));
    } else {
      currentTime.setHours(currentTime.getHours() - localOffset);
    }

    if (
      reservation.projection.startDate.getTime() - currentTime.getTime() >
      oneDayInMilliseconds
    ) {
      return await this.updateReservationStatus(
        reservationId,
        ReservationStatus.CANCELLED,
      );
    } else {
      throw new BadRequestException(
        'Cannot cancel reservation later than one day in advance',
      );
    }
  }
}
