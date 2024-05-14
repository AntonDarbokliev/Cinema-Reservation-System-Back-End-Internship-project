import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HallService } from './hall.service';
import { CreateHallDto } from './dto';

@Controller('halls')
export class HallController {
  constructor(private hallService: HallService) {}

  @Get()
  async getAllHalls() {
    return await this.hallService.getAllHalls();
  }

  @Get(':id')
  async getHall(@Param() params: { id: string }) {
    return await this.hallService.getHall(params.id);
  }

  @Post()
  async createHall(@Body() hallDto: CreateHallDto) {
    return await this.hallService.createHall(hallDto);
  }

  @Patch(':id')
  async updateHall(@Body() hallDto: CreateHallDto, @Param('id') id: string) {
    return await this.hallService.updateHall(id, hallDto);
  }

  @Delete(':id')
  async deleteHall(@Param() id: string) {
    return await this.hallService.deleteHall(id);
  }
}
