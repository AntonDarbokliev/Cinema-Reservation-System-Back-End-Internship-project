import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Seat } from 'src/modules/hall/hall.schema';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  projection: string;

  @IsString()
  @IsOptional()
  reservaton?: string;

  @IsString()
  @IsNotEmpty()
  seat: Seat;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  seatRow: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  seatNumber: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  price: number;
}
