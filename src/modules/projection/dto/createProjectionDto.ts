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
  movie: string;

  @IsString()
  @IsNotEmpty()
  cinema: string;

  @IsString()
  @IsNotEmpty()
  hall: string;
}
