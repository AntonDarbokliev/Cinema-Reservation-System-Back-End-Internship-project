import { Module } from '@nestjs/common';
import { SeatTypeController } from './seat-type.controller';
import { SeatTypeService } from './seat-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SeatType, seatTypeSchema } from './seat-type.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SeatType.name, schema: seatTypeSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [SeatTypeController],
  providers: [SeatTypeService],
})
export class SeatTypeModule {}
