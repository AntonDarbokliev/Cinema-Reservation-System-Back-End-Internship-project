import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, movieSchema } from './movie.schema';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Cinema, cinemaSchema } from '../cinema/cinema.schema';
import { RolesModule } from '../roles/roles.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: movieSchema }]),
    MongooseModule.forFeature([{ name: Cinema.name, schema: cinemaSchema }]),
    CloudinaryModule,
    RolesModule,
    JwtModule,
  ],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
