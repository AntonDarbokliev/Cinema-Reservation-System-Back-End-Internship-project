import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Rating, Genre } from './index';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  rating: Rating;

  @IsArray()
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
  @IsArray()
  actors: string[];

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
