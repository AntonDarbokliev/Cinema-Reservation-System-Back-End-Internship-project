import { ProjectionType } from './projectionType';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProjectionDto {
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  projectionType: ProjectionType;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  baseTicketPrice: number;

  @IsString()
  @IsNotEmpty()
  movieId: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  movieLength: string | number;

  @IsString()
  @IsNotEmpty()
  cinemaId: string;

  @IsString()
  @IsNotEmpty()
  hall: string;
}
