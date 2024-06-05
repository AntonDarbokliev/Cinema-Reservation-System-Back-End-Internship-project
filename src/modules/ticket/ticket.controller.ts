import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/CreateTicketDto';

@Controller('tickets')
export class TicketContoller {
  constructor(private ticketService: TicketService) {}

  @Post()
  async createTicket(@Body() ticketDto: CreateTicketDto) {
    return await this.ticketService.createTicket(ticketDto);
  }

  @Get('projection/:projectionId')
  async getTicketsForProjection(@Param('projectionId') projectionId: string) {
    return await this.ticketService.getTicketsForProjection(projectionId);
  }
}
