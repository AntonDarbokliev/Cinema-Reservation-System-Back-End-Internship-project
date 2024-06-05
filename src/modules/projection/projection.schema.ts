import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Hall } from '../hall/hall.schema';
import { Cinema } from '../cinema/cinema.schema';
import { ProjectionType } from './dto/projectionType';
import { Movie } from '../movie/movie.schema';

@Schema()
export class Projection {
  @Prop({ type: String, required: true })
  startTime: string;

  @Prop({ type: String, required: true })
  startDate: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true,
  })
  cinema: Cinema;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hall',
    required: true,
  })
  hall: Hall;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  })
  movie: Movie;

  @Prop({ type: String, required: true })
  projectionType: ProjectionType;

  @Prop({ type: Number, required: true })
  baseTicketPrice: number;
}

export const projectionSchema = SchemaFactory.createForClass(Projection);
