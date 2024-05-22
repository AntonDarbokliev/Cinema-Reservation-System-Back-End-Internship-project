import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCinemaDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsArray()
  // hallPlans: object[]; // Change to hall plan[] later

  // @IsArray()
  // menu: CreateMenuItem[];

  // @IsArray()
  // projections: CreateProjection[];
}
