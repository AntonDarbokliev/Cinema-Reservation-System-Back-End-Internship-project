import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCinemaDto } from './dto';
import { CinemaService } from './cinema.service';
import { Public } from '../auth/decorator';
import { EditCinemaDto } from './dto/editCinemaDto';

@Controller('cinemas')
export class CinemaController {
  constructor(private cinemaService: CinemaService) {}

  @Post()
  async addCinema(@Body() createCinemaDto: CreateCinemaDto) {
    return await this.cinemaService.createCinema(createCinemaDto);
  }

  @Public()
  @Get()
  async getAllCinemas() {
    return await this.cinemaService.getAllCinemas();
  }

  @Public()
  @Get(':id')
  async getCinema(@Param() params: { id: string }) {
    return await this.cinemaService.getCinema(params.id);
  }

  @Patch(':id')
  async updateCinema(
    @Param() params: { id: string },
    @Body() editCinemaDto: EditCinemaDto,
  ) {
    return await this.cinemaService.updateCinema(params.id, editCinemaDto);
  }

  @Delete(':id')
  async deleteCinema(@Param() params: { id: string }) {
    return await this.cinemaService.deleteCinema(params.id);
  }
}
