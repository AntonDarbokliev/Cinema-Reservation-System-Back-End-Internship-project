import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateProjection, CreateMenuItem } from './dto/index';
import mongoose, { HydratedDocument } from 'mongoose';
import { Hall } from '../hall/hall.schema';
import { Movie } from '../movie/movie.schema';

export type CinemaDocument = HydratedDocument<Cinema>;

@Schema()
export class Cinema {
  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: Number })
  numberOfHalls: number;

  @Prop({ required: true, type: Array })
  menu: CreateMenuItem[];

  @Prop({ required: true, type: Array })
  projections: CreateProjection[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hall' }] })
  halls: Hall[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movies: Movie[];
}

export const cinemaSchema = SchemaFactory.createForClass(Cinema);

cinemaSchema.pre('save', function (next) {
  this.numberOfHalls = this.halls.length;
  next();
});

cinemaSchema.pre('updateOne', function (next) {
  const updatedData: any = this.getUpdate();
  if (updatedData.hasOwnProperty('hallPlans')) {
    updatedData.numberOfHalls = updatedData.hallPlans.length;
  }
  next();
});
