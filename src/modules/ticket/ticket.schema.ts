import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now } from 'mongoose';
import { Projection } from '../projection/projection.schema';
import { Reservation } from '../reservation/reservation.schema';
import { Seat } from '../hall/hall.schema';

@Schema()
export class Ticket {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Projection' })
  projection: Projection;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Reservation' })
  reservaton: Reservation;
  // Check if ticket's seat is in the reservations arr, if it is, don't sell it unless the reservation is given.
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Seat' })
  seat: Seat;

  @Prop({ type: Number, required: true })
  seatRow: number;

  @Prop({ type: Number, required: true })
  seatNumber: number;

  @Prop({ type: Date, default: now() })
  bought: Date;
}

export const ticketSchema = SchemaFactory.createForClass(Ticket);
