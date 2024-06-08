import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  seat: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  seatRow: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  seatNumber: number;

  @IsString()
  @IsNotEmpty()
  projectionId: string;

  @IsString()
  @IsOptional()
  user?: string;

  @IsString()
  @IsNotEmpty()
  movieName: string;

  @IsString()
  @IsOptional()
  moviePoster: string;
}
