import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/createMovieDto';
import { Cinema } from '../cinema/cinema.schema';
import { ProjectionStatus } from '../projection/projection.schema';

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

  async getMovies(cinemaId: string, projections?: string, date?: string) {
    const dateToPass = new Date(date);
    const moviesWithProjections = await this.movieModel
      .find({ cinemaId })
      .populate(projections == 'true' ? 'projections' : null);
    if (date) {
      moviesWithProjections.forEach(
        (movie) =>
          (movie.projections = movie.projections.filter((projection) => {
            return (
              projection.startDate.getDate() === dateToPass.getDate() &&
              projection.startDate.getMonth() === dateToPass.getMonth() &&
              projection.startDate.getFullYear() === dateToPass.getFullYear()
            );
          })),
      );
    }
    return moviesWithProjections;
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
