import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, movieSchema } from './movie.schema';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: movieSchema }]),
  ],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
