import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateMenuItem, CreateProjection } from './index';

export class CreateCinemaDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  hallPlans: object[]; // Change to hall plan[] later

  @IsArray()
  menu: CreateMenuItem[];

  @IsArray()
  projections: CreateProjection[];
}
