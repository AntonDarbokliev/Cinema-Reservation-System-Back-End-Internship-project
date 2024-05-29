import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSeatTypeDto } from './dto/createSeatTypeDto';
import { SeatTypeService } from './seat-type.service';

@Controller('seat-types')
export class SeatTypeController {
  constructor(private seatTypeService: SeatTypeService) {}

  @Post()
  async createSeatType(@Body() dto: CreateSeatTypeDto) {
    return await this.seatTypeService.createSeatType(dto);
  }

  @Get(':cinemaId')
  async getAllCinemaSeatTypes(@Param('cinemaId') cinemaId: string) {
    return await this.seatTypeService.getAllCinemaSeatTypes(cinemaId);
  }
}
