import { Module, forwardRef } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, reservationSchema } from './reservation.schema';
import { ProjectionModule } from '../projection/projection.module';
import { ReservationGateway } from './reservation.gateway';
import { TicketModule } from '../ticket/ticket.module';
import { Seat, seatSchema } from '../hall/hall.schema';

@Module({
  providers: [ReservationService, ReservationGateway],
  controllers: [ReservationController],
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: reservationSchema },
      { name: Seat.name, schema: seatSchema },
    ]),

    ProjectionModule,
    forwardRef(() => TicketModule),
  ],
  exports: [ReservationService],
})
export class ReservationModule {}
