import { Body, Controller, Get, Post } from '@nestjs/common';
import { HallService } from './hall.service';
import { CreateHallDto } from './dto';

@Controller('halls')
export class HallController {
  constructor(private hallService: HallService) {}

  @Get()
  async getHalls() {
    return await this.hallService.getHalls();
  }

  @Post()
  async createHall(@Body() hallDto: CreateHallDto) {
    return await this.hallService.createHall(hallDto);
  }
}
