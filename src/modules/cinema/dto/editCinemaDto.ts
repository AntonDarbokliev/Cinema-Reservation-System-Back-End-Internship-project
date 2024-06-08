import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateMenuItem } from './index';
import { Transform } from 'class-transformer';
import { CreateProjectionDto } from 'src/modules/projection/dto/createProjectionDto';

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
  projections?: CreateProjectionDto[];
}
