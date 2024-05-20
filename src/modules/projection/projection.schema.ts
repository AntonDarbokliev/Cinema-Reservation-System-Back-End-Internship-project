import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Hall } from '../hall/hall.schema';
import { Cinema } from '../cinema/cinema.schema';
import { ProjectionType } from './dto/projectionType';

@Schema()
export class Projection {
  @Prop({ type: String, required: true })
  startTime: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' }],
    required: true,
  })
  cinema: Cinema;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hall' }],
    required: true,
  })
  hall: Hall;

  @Prop({ type: String, required: true })
  projectionType: ProjectionType;

  @Prop({ type: Number, required: true })
  baseTicketPrice: number;
}

export const projectionSchema = SchemaFactory.createForClass(Projection);
