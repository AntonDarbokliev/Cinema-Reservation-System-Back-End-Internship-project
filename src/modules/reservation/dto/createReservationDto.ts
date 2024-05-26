import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  projection: string;
}
