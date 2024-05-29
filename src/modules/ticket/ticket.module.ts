import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, ticketSchema } from './ticket.schema';
import { TicketService } from './ticket.service';
import { TicketContoller } from './ticket.controller';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: ticketSchema }]),
    ReservationModule,
  ],
  providers: [TicketService],
  controllers: [TicketContoller],
})
export class TicketModule {}
