import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, ticketSchema } from './ticket.schema';
import { TicketService } from './ticket.service';
import { TicketContoller } from './ticket.controller';
import { ReservationModule } from '../reservation/reservation.module';
import { Projection, projectionSchema } from '../projection/projection.schema';
import { ProjectionModule } from '../projection/projection.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: ticketSchema }]),
    MongooseModule.forFeature([
      { name: Projection.name, schema: projectionSchema },
    ]),
    forwardRef(() => ReservationModule),
    ProjectionModule,
  ],
  providers: [TicketService],
  controllers: [TicketContoller],
  exports: [TicketService],
})
export class TicketModule {}
