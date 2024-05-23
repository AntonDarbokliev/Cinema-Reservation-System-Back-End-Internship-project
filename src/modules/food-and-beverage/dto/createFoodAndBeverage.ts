import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFoodAndBeverage {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  cinemaId: string;
}
