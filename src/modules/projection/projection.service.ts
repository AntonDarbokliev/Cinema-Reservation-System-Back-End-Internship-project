import { InjectModel } from '@nestjs/mongoose';
import { Projection } from './projection.schema';
import { Model } from 'mongoose';
import { CreateProjectionDto } from './dto/createProjectionDto';
import { Movie } from '../movie/movie.schema';
import { Cinema } from '../cinema/cinema.schema';
import { ProjectionType } from './dto/projectionType';

export class ProjectionService {
  constructor(
    @InjectModel(Projection.name) private projectionModel: Model<Projection>,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(Cinema.name) private cinemaModel: Model<Cinema>,
  ) {}

  async getProjections() {
    return await this.projectionModel
      .find()
      .populate('hall')
      .populate('cinema');
  }

  async getProjection(id: string) {
    return await this.projectionModel
      .findById(id)
      .populate('hall')
      .populate('movie')
      .populate('reservations');
  }

  getTypesOfProjections() {
    const projectionTypes = Object.values(ProjectionType);
    return projectionTypes;
  }

  async createProjection(dto: CreateProjectionDto) {
    const projection = await this.projectionModel.create(dto);
    await this.movieModel.findByIdAndUpdate(dto.movie, {
      $push: { projections: projection },
    });

    await this.cinemaModel.findByIdAndUpdate(dto.cinema, {
      $push: { projections: projection },
    });
    return projection;
  }
}
