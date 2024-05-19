import { Rating, Genre } from './index';

export interface CreateMovieDto {
  rating: Rating;

  genres: Genre[];

  length: string;

  director: Rating;

  description: Rating;

  actors: Rating;

  language: string;

  production?: Rating;

  subtitles?: string;
}
