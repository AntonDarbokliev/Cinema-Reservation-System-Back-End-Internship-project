import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/createMovieDto';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async getMovies() {
    return await this.movieModel.find();
  }

  async createMovie(dto: CreateMovieDto, imageUrl: string) {
    return await this.movieModel.create({ ...dto, poster: imageUrl });
  }
}
