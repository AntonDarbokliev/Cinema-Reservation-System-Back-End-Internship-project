import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateMenuItem, CreateProjection } from './index';
import { Transform } from 'class-transformer';

export class EditCinemaDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  numberOfHalls?: string;

  // @IsArray()
  // @IsOptional()
  // hallPlans?: CreateHallPlan[];

  @IsArray()
  @IsOptional()
  menu?: CreateMenuItem[];

  @IsArray()
  @IsOptional()
  projections?: CreateProjection[];
}
