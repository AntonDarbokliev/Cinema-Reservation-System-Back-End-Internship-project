import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateMenuItem } from './dto/index';
import mongoose, { HydratedDocument } from 'mongoose';
import { Hall } from '../hall/hall.schema';
import { Movie } from '../movie/movie.schema';

export type CinemaDocument = HydratedDocument<Cinema>;

@Schema({
  toJSON: { virtuals: true },
})
export class Cinema {
  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: Number })
  numberOfHalls: number;

  @Prop({ type: Array })
  menu: CreateMenuItem[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hall' }] })
  halls: Hall[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movies: Movie[];
}

export const cinemaSchema = SchemaFactory.createForClass(Cinema);

cinemaSchema.pre('save', function (next) {
  if (this.hasOwnProperty('halls')) {
    this.numberOfHalls = this.halls.length;
  }
  this.numberOfHalls = this.halls.length;
  next();
});

cinemaSchema.pre('updateOne', function (next) {
  const updatedData: any = this.getUpdate();
  if (updatedData.hasOwnProperty('halls')) {
    updatedData.numberOfHalls = updatedData.halls.length;
  }
  next();
});

cinemaSchema.virtual('projections', {
  ref: 'Projection',
  localField: '_id',
  foreignField: 'cinemaId',
});
