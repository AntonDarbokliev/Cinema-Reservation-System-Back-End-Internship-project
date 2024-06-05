import { ProjectionType } from './projectionType';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class EditProjectionDto {
  @IsString()
  @IsOptional()
  startTime: string;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  projectionType: ProjectionType;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  baseTicketPrice: number;

  @IsString()
  @IsOptional()
  movie: string;

  @IsString()
  @IsOptional()
  cinema: string;

  @IsString()
  @IsOptional()
  hall: string;
}
