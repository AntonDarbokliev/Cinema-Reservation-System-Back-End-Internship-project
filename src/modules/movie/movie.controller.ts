import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/createMovieDto';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getMovies() {
    return await this.movieService.getMovies();
  }

  @Post()
  async createMovie(@Body() movieDto: CreateMovieDto) {
    return await this.movieService.createMovie(movieDto);
  }
}
