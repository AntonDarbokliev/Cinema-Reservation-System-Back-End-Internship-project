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
    default: ReservationStatus.RESERVED,
  })
  status: ReservationStatus;
}

export const reservationSchema = SchemaFactory.createForClass(Reservation);
