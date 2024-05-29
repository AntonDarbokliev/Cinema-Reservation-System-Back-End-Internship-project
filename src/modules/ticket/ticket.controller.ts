import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/CreateTicketDto';
import { GetProjectionDto } from './dto/GetProjectionDto';

@Controller('tickets')
export class TicketContoller {
  constructor(private ticketService: TicketService) {}

  @Post()
  async createTicket(@Body() ticketDto: CreateTicketDto) {
    return await this.ticketService.createTicket(ticketDto);
  }

  @Get()
  async getTicketsForProjection(@Body() getProjectionDto: GetProjectionDto) {
    return await this.ticketService.getTicketsForProjection(
      getProjectionDto.projectionId,
    );
  }
}
