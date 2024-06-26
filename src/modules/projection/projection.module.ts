import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, movieSchema } from '../movie/movie.schema';
import { ProjectionController } from './projection.controller';
import { ProjectionService } from './projection.service';
import { Projection, projectionSchema } from './projection.schema';
import { Cinema, cinemaSchema } from '../cinema/cinema.schema';
import { HallModule } from '../hall/hall.module';
import { RolesModule } from '../roles/roles.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: movieSchema }]),
    MongooseModule.forFeature([{ name: Cinema.name, schema: cinemaSchema }]),
    MongooseModule.forFeature([
      { name: Projection.name, schema: projectionSchema },
    ]),
    HallModule,
    RolesModule,
    JwtModule,
  ],
  controllers: [ProjectionController],
  providers: [ProjectionService],
  exports: [ProjectionService],
})
export class ProjectionModule {}
