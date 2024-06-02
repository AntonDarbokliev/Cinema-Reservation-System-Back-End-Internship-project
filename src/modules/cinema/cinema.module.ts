import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cinema, cinemaSchema } from './cinema.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cinema.name, schema: cinemaSchema }]),
  ],
  providers: [CinemaService],
  controllers: [CinemaController],
})
export class CinemaModule {}
