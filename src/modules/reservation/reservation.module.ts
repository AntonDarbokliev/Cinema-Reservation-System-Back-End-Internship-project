import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, reservationSchema } from './reservation.schema';
import { Seat, seatSchema } from '../hall/hall.schema';
import { Projection, projectionSchema } from '../projection/projection.schema';
import { User, userSchema } from '../user/user.schema';

@Module({
  providers: [ReservationService],
  controllers: [ReservationController],
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: reservationSchema },
    ]),
    MongooseModule.forFeature([{ name: Seat.name, schema: seatSchema }]),
    MongooseModule.forFeature([
      { name: Projection.name, schema: projectionSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  exports: [ReservationService],
})
export class ReservationModule {}
