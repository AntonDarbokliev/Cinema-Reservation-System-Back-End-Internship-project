import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/createMovieDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('movies')
export class MovieController {
  constructor(
    private movieService: MovieService,
    private cloudinarySerive: CloudinaryService,
  ) {}

  @Get()
  async getMovies() {
    return await this.movieService.getMovies();
  }

  @Post()
  @UseInterceptors(FileInterceptor('poster'))
  async createMovie(
    @Body() movieDto: CreateMovieDto,
    @UploadedFile() poster: Express.Multer.File,
  ) {
    const imageUrl = (await this.cloudinarySerive.uploadFile(poster)).url;

    return await this.movieService.createMovie(movieDto, imageUrl);
  }
}
