import { InjectModel } from '@nestjs/mongoose';
import { Projection } from './projection.schema';
import { Model } from 'mongoose';
import { CreateProjectionDto } from './dto/createProjectionDto';
import { Movie } from '../movie/movie.schema';

export class ProjectionService {
  constructor(
    @InjectModel(Projection.name) private projectionModel: Model<Projection>,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) {}

  async getProjections() {
    return await this.projectionModel.find();
  }

  async createProjection(dto: CreateProjectionDto, movieId: string) {
    const projection = await this.projectionModel.create(dto);
    await this.movieModel.findByIdAndUpdate(movieId, {
      $push: { projections: projection },
    });
    return projection;
  }
}
