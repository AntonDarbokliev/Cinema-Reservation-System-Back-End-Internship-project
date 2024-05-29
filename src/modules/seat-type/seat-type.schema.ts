import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Cinema } from '../cinema/cinema.schema';

@Schema()
export class SeatType {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: 'Cinema' })
  cinema: Cinema;

  @Prop({ type: Number, required: true })
  price: number;
}

export const seatTypeSchema = SchemaFactory.createForClass(SeatType);
