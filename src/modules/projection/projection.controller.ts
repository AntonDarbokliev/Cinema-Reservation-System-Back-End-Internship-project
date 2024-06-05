import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectionService } from './projection.service';
import { CreateProjectionDto } from './dto/createProjectionDto';
import { EditProjectionDto } from './dto/editProjectionDto';
import { RolesGuard } from '../roles/guard';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/decorator/roles.decorator';

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

  @UseGuards(RolesGuard)
  @Roles([Role.ROOT_ADMIN])
  @Patch(':projectionId')
  async editProjection(
    @Param('projectionId') projectionId: string,
    @Body() dto: EditProjectionDto,
  ) {
    return await this.projectionService.editProjection(projectionId, dto);
  }

  @UseGuards(RolesGuard)
  @Roles([Role.ROOT_ADMIN])
  @Delete(':projectionId')
  async deleteProjection(@Param('projectionId') projectionId: string) {
    return await this.projectionService.deleteProjection(projectionId);
  }
}
