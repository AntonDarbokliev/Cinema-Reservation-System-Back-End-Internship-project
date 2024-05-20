import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Rating, Genre } from './index';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  rating: Rating;

  @IsNotEmpty()
  genres: Genre[];

  @IsNotEmpty()
  @IsString()
  length: string;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  actors: string;

  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsOptional()
  production?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  subtitles?: string;

  @IsNotEmpty()
  @IsString()
  cinemaId: string;
}
