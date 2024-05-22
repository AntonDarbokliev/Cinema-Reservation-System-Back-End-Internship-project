import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Rating, Genre } from './dto';
import mongoose from 'mongoose';
import { Projection } from '../projection/projection.schema';

@Schema()
export class Movie {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  rating: Rating;

  @Prop({ type: Array, required: true })
  genres: Genre[];

  @Prop({ type: String, required: true })
  length: string;

  @Prop({ type: String, required: true })
  director: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Array(String), required: true })
  actors: string[];

  @Prop({ type: String, required: true })
  language: string;

  @Prop({ type: String, required: true })
  poster: string;

  @Prop({ type: String })
  production?: Rating;

  @Prop({ type: String })
  subtitles?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projection' }] })
  projections: Projection[];
}

export const movieSchema = SchemaFactory.createForClass(Movie);
