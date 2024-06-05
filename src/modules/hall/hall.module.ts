import { Module } from '@nestjs/common';
import { HallController } from './hall.controller';
import { HallService } from './hall.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hall, hallSchema } from './hall.schema';
import { Cinema, cinemaSchema } from '../cinema/cinema.schema';

@Module({
  controllers: [HallController],
  providers: [HallService],
  imports: [
    MongooseModule.forFeature([{ name: Hall.name, schema: hallSchema }]),
    MongooseModule.forFeature([{ name: Cinema.name, schema: cinemaSchema }]),
  ],
  exports: [HallService],
})
export class HallModule {}
