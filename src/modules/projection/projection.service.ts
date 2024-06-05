import { InjectModel } from '@nestjs/mongoose';
import { Projection } from './projection.schema';
import { Model } from 'mongoose';
import { CreateProjectionDto } from './dto/createProjectionDto';
import { Movie } from '../movie/movie.schema';
import { Cinema } from '../cinema/cinema.schema';
import { ProjectionType } from './dto/projectionType';
import { HallService } from '../hall/hall.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EditProjectionDto } from './dto/editProjectionDto';

@Injectable()
export class ProjectionService {
  constructor(
    @InjectModel(Projection.name) private projectionModel: Model<Projection>,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(Cinema.name) private cinemaModel: Model<Cinema>,
    private hallService: HallService,
  ) {}

  async getProjectionsForCinema(cinemaId: string) {
    return await this.projectionModel
      .find({ cinemaId })
      .populate('hall')
      .populate('movie');
  }

  async getProjectionsForMovie(movieId: string) {
    return await this.projectionModel
      .find({ movie: movieId })
      .populate('hall')
      .populate('movie');
  }

  async getProjectionsForHall(hallId: string) {
    return await this.projectionModel.find({ hall: hallId }).populate('movie');
  }

  async getProjection(id: string) {
    return await this.projectionModel
      .findById(id)
      .populate('hall')
      .populate('movie')
      .populate('reservations')
      .populate('tickets');
  }

  getTypesOfProjections() {
    const projectionTypes = Object.values(ProjectionType);
    return projectionTypes;
  }

  async checkIfHallIsAvaibleForProjection(
    projection: CreateProjectionDto | Projection,
  ) {
    const projectionsForHall = await this.getProjectionsForHall(
      String(projection.hall),
    );

    const newProjectionMovie = await this.movieModel.findById(projection.movie);
    const newProjectionStartComponents = projection.startTime.split(':');
    const newProjectionStartHours = parseInt(
      newProjectionStartComponents[0],
      10,
    );
    const newProjectionStartMinutes = parseInt(
      newProjectionStartComponents[1],
      10,
    );

    const newProjectionStart = new Date(projection.startDate);
    newProjectionStart.setUTCHours(
      newProjectionStartHours,
      newProjectionStartMinutes,
    );
    const newProjectionLengthHours = Number(newProjectionMovie.length) / 60;
    const newProjectionEnd = new Date(
      newProjectionStart.getTime() + newProjectionLengthHours * 60 * 60 * 1000,
    );

    const isAvaible = projectionsForHall.every((projection) => {
      const projectionStartComponents = projection.startTime.split(':');
      const projectionStartHours = parseInt(projectionStartComponents[0], 10);
      const projectionStartMinutes = parseInt(projectionStartComponents[1], 10);

      const projectionStart = new Date(projection.startDate);
      projectionStart.setUTCHours(projectionStartHours, projectionStartMinutes);
      const projectionLengthHours = Number(projection.movie.length) / 60;
      const projectionEnd = new Date(
        projectionStart.getTime() + projectionLengthHours * 60 * 60 * 1000,
      );

      return (
        newProjectionStart.getTime() > projectionEnd.getTime() ||
        (newProjectionStart.getTime() < projectionStart.getTime() &&
          newProjectionEnd.getTime() < projectionStart.getTime())
      );
    });
    if (!isAvaible) {
      throw new BadRequestException('Hall is occupied during that time');
    }
  }

  async createProjection(dto: CreateProjectionDto) {
    await this.checkIfHallIsAvaibleForProjection(dto);
    const projection = await this.projectionModel.create(dto);
    await this.movieModel.findByIdAndUpdate(dto.movie, {
      $push: { projections: projection },
    });

    await this.cinemaModel.findByIdAndUpdate(dto.cinemaId, {
      $push: { projections: projection },
    });
    return projection;
  }

  async editProjection(projectionId: string, dto: EditProjectionDto) {
    return await this.projectionModel.findByIdAndUpdate(projectionId, dto, {
      new: true,
      populate: 'cinema hall movie',
    });
  }

  async deleteProjection(projectionId: string) {
    return await this.projectionModel.findByIdAndDelete(projectionId);
  }
}
