import { Hall } from 'src/modules/hall/hall.schema';
import { ProjectionType } from './projectionType';
import { Cinema } from 'src/modules/cinema/cinema.schema';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectionDto {
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  cinema: Cinema;

  @IsNotEmpty()
  hall: Hall;

  @IsString()
  @IsNotEmpty()
  projectionType: ProjectionType;

  @IsNumber()
  @IsNotEmpty()
  baseTicketPrice: number;
}
