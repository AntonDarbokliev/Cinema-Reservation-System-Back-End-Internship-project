import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now } from 'mongoose';
import { Projection } from '../projection/projection.schema';
import { Seat } from '../hall/hall.schema';
import { ReservationStatus } from './dto/reservationStatus';

@Schema()
export class Reservation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true })
  seat: Seat;

  @Prop({ type: Number, required: true })
  seatRow: number;

  @Prop({ type: Number, required: true })
  seatNumber: number;

  @Prop({ type: Date, default: now() })
  made: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projection',
    required: true,
  })
  projection: Projection;

  @Prop({
    type: String,
    enum: ReservationStatus,
    default: ReservationStatus.ACTIVE,
  })
  status: ReservationStatus;
  // Cannot be a virtual property since it's based on a projection and projections could be deleted after passing
  // meaning that the status cannot be calculated since the reservation is not linked to a projection

  @Prop({ type: mongoose.Types.ObjectId })
  userId: string;
}

export const reservationSchema = SchemaFactory.createForClass(Reservation);
