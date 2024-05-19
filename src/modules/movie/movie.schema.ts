import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Rating, Genre } from './dto';

@Schema()
export class Movie {
  @Prop({ type: String, required: true })
  rating: Rating;

  @Prop({ type: Array, required: true })
  genres: Genre[];

  @Prop({ type: String, required: true })
  length: string;

  @Prop({ type: String, required: true })
  director: Rating;

  @Prop({ type: String, required: true })
  description: Rating;

  @Prop({ type: String, required: true })
  actors: Rating;

  @Prop({ type: String, required: true })
  language: string;

  @Prop({ type: String, required: true })
  poster: string;

  @Prop({ type: String })
  production?: Rating;

  @Prop({ type: String })
  subtitles?: string;
}

export const movieSchema = SchemaFactory.createForClass(Movie);
