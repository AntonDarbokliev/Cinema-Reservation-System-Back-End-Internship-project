import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { Public } from '../auth/decorator';
import { ProjectionType } from '../projection/dto/projectionType';

@Controller('movies')
export class MovieController {
  constructor(
    private movieService: MovieService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Public()
  @Get('cinema/:cinemaId')
  async getMoviesWithProjections(
    @Param('cinemaId') cinemaId: string,
    @Query('projections') projections: string,
    @Query('date') date: string,
    @Query('projectionType') projectionType: ProjectionType,
  ) {
    return await this.movieService.getMovies(
      cinemaId,
      projections,
      date,
      projectionType,
    );
  }

  @Public()
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
    let imageUrl: string;
    if (!movieDto.poster) {
      await this.cloudinaryService.deleteImage(publicImageId);
      imageUrl = (await this.cloudinaryService.uploadFile(poster, true)).url;
    } else {
      imageUrl = movieDto.poster;
    }
    return await this.movieService.editMovie(movieDto, imageUrl, movieId);
  }

  @UseGuards(RolesGuard)
  @Roles([Role.ROOT_ADMIN])
  @Delete(':movieId')
  async deleteMovie(@Param('movieId') movieId: string) {
    return await this.movieService.deleteMovie(movieId);
  }
}
