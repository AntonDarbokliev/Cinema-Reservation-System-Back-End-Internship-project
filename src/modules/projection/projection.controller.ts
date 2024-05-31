import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectionService } from './projection.service';
import { CreateProjectionDto } from './dto/createProjectionDto';
import { EditProjectionDto } from './dto/editProjectionDto';

@Controller('projections')
export class ProjectionController {
  constructor(private projectionService: ProjectionService) {}

  @Get('cinema/:cinemaId')
  async getProjectionsForCinema(@Param('cinemaId') cinemaId: string) {
    return await this.projectionService.getProjectionsForCinema(cinemaId);
  }

  @Get('movie/:movieId')
  async getProjectionsForMovie(@Param('movieId') movieId: string) {
    return await this.projectionService.getProjectionsForMovie(movieId);
  }

  @Get('types')
  getTypesOfProjections() {
    return this.projectionService.getTypesOfProjections();
  }

  @Get(':projectionId')
  async getProjection(@Param('projectionId') projectionId: string) {
    return await this.projectionService.getProjection(projectionId);
  }

  @Post()
  async createProjection(@Body() projectionDto: CreateProjectionDto) {
    return await this.projectionService.createProjection(projectionDto);
  }

  @Patch(':projectionId')
  async editProjection(
    @Param('projectionId') projectionId: string,
    @Body() dto: EditProjectionDto,
  ) {
    return await this.projectionService.editProjection(projectionId, dto);
  }
}
