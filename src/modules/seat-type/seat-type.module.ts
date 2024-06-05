import { Module } from '@nestjs/common';
import { SeatTypeController } from './seat-type.controller';
import { SeatTypeService } from './seat-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SeatType, seatTypeSchema } from './seat-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SeatType.name, schema: seatTypeSchema },
    ]),
  ],
  controllers: [SeatTypeController],
  providers: [SeatTypeService],
})
export class SeatTypeModule {}
