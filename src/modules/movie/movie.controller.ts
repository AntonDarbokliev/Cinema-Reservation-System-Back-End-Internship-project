import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/createMovieDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EditMovieDto } from './dto/editMovieDto';
import { RolesGuard } from '../roles/guard';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/decorator/roles.decorator';

@Controller('movies')
export class MovieController {
  constructor(
    private movieService: MovieService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async getMovies() {
    return await this.movieService.getMovies();
  }

  @Get(':movieId')
  async getMovie(@Param('movieId') movieId: string) {
    return await this.movieService.getMovie(movieId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('poster'))
  async createMovie(
    @Body() movieDto: CreateMovieDto,
    @UploadedFile() poster: Express.Multer.File,
  ) {
    const imageUrl = (await this.cloudinaryService.uploadFile(poster, true))
      .url;

    return await this.movieService.createMovie(movieDto, imageUrl);
  }

  @UseGuards(RolesGuard)
  @Roles([Role.ROOT_ADMIN])
  @Patch(':movieId')
  @UseInterceptors(FileInterceptor('poster'))
  async editMovie(
    @Body() movieDto: EditMovieDto,
    @UploadedFile() poster: Express.Multer.File,
    @Param('movieId') movieId: string,
  ) {
    const movie = await this.movieService.getMovie(movieId);
    const publicImageId = this.cloudinaryService.getPublicId(movie.poster);
    await this.cloudinaryService.deleteImage(publicImageId);
    const imageUrl = (await this.cloudinaryService.uploadFile(poster, true))
      .url;
    return await this.movieService.editMovie(movieDto, imageUrl, movieId);
  }

  @UseGuards(RolesGuard)
  @Roles([Role.ROOT_ADMIN])
  @Delete(':movieId')
  async deleteMovie(@Param('movieId') movieId: string) {
    return await this.movieService.deleteMovie(movieId);
  }
}
