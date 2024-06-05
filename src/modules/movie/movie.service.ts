import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/createMovieDto';
import { Cinema } from '../cinema/cinema.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(Cinema.name) private cinemaModel: Model<Cinema>,
  ) {}

  async getMovie(movieId: string) {
    return await this.movieModel.findById(movieId);
  }

  async getMovies() {
    return await this.movieModel.find();
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
    return await this.movieModel.findByIdAndDelete(movieId);
  }
}
