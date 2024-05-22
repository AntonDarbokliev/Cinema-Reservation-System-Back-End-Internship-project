import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, movieSchema } from '../movie/movie.schema';
import { ProjectionController } from './projection.controller';
import { ProjectionService } from './projection.service';
import { Projection, projectionSchema } from './projection.schema';
import { Cinema, cinemaSchema } from '../cinema/cinema.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: movieSchema }]),
    MongooseModule.forFeature([{ name: Cinema.name, schema: cinemaSchema }]),
    MongooseModule.forFeature([
      { name: Projection.name, schema: projectionSchema },
    ]),
  ],
  controllers: [ProjectionController],
  providers: [ProjectionService],
})
export class ProjectionModule {}
