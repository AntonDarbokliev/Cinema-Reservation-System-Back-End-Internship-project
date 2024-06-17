import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/createMovieDto';
import { Cinema } from '../cinema/cinema.schema';
import { ProjectionStatus } from '../projection/projection.schema';
import { ProjectionType } from '../projection/dto/projectionType';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(Cinema.name) private cinemaModel: Model<Cinema>,
  ) {}

  async getMovie(movieId: string) {
    const movie = await this.movieModel
      .findById(movieId)
      .populate('projections');

    return movie;
  }

  async getMovies(
    cinemaId: string,
    projections?: string,
    date?: string,
    projectionType?: ProjectionType,
  ) {
    const dateToPass = new Date(date);
    const moviesWithProjections = await this.movieModel
      .find({ cinemaId })
      .populate(projections == 'true' ? 'projections' : null);
    this.filterOutMovieProjections(
      moviesWithProjections,
      dateToPass,
      projectionType,
    );

    return moviesWithProjections;
  }

  filterOutMovieProjections(
    moviesWithProjections: Movie[],
    date?: Date,
    projectionType?: ProjectionType,
  ) {
    moviesWithProjections.forEach((movie) => {
      movie.projections = movie.projections.filter((projection) => {
        const hasProjectionEnded =
          projection.status === ProjectionStatus.PROJECTION_ENDED;
        const isDateValid =
          projection.startDate.getDate() === date.getDate() &&
          projection.startDate.getMonth() === date.getMonth() &&
          projection.startDate.getFullYear() === date.getFullYear();
        const doesProjectionTypeMatch =
          projection.projectionType === projectionType;

        if (projectionType && date) {
          return isDateValid && !hasProjectionEnded && doesProjectionTypeMatch;
        } else if (date) {
          return isDateValid && !hasProjectionEnded;
        }
        return !hasProjectionEnded;
      });
    });
  }

  async createMovie(dto: CreateMovieDto, imageUrl: string) {
    const newMovie = await this.movieModel.create({ ...dto, poster: imageUrl });
    await this.cinemaModel.findByIdAndUpdate(dto.cinemaId, {
      $push: { movies: newMovie._id },
    });

    return newMovie;
  }

  async editMovie(dto: CreateMovieDto, imageUrl: string, movieId: string) {
    return await this.movieModel.findByIdAndUpdate(
      movieId,
      {
        ...dto,
        poster: imageUrl,
      },
      { new: true },
    );
  }

  async deleteMovie(movieId: string) {
    const movie = await this.movieModel
      .findById(movieId)
      .populate('projections');
    for (const projection of movie.projections) {
      if (projection.status !== ProjectionStatus.PROJECTION_ENDED) {
        throw new BadRequestException(
          "Projection/s that haven't ended yet found",
        );
      }
    }
    return await this.movieModel.findByIdAndDelete(movieId);
  }
}
