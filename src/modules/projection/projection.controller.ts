import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectionService } from './projection.service';
import { CreateProjectionDto } from './dto/createProjectionDto';

@Controller('projections')
export class ProjectionController {
  constructor(private projectionService: ProjectionService) {}

  @Get()
  async getProjections() {
    return await this.projectionService.getProjections();
  }

  @Post(':movieId')
  async createProjection(
    @Body() projectionDto: CreateProjectionDto,
    @Param() movieId: string,
  ) {
    return await this.projectionService.createProjection(
      projectionDto,
      movieId,
    );
  }
}
