import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateMenuItem, CreateHallPlan, CreateProjection } from './index';
import { Transform } from 'class-transformer';

export class CreateCinemaDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  numberOfHalls: string;

  @IsArray()
  hallPlans: CreateHallPlan[];

  @IsArray()
  menu: CreateMenuItem[];

  @IsArray()
  projections: CreateProjection[];
}
