import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Rating } from 'src/modules/movie/dto';

enum ProjectionType {
  PROJECTION_2D = '2D',
  PROJECTION_3D = '3D',
  PROJECTION_4DX = '4DX',
}

export class CreateProjection {
  @IsDate()
  date: Date;

  @IsString()
  time: string;

  @IsString()
  cinema: string;

  @IsNumber()
  hall: number;

  @IsBoolean()
  isPremiere: boolean;

  @IsString()
  @ValidateIf(
    (obj) =>
      obj.type == ProjectionType.PROJECTION_2D ||
      obj.type == ProjectionType.PROJECTION_3D ||
      obj.type == ProjectionType.PROJECTION_4DX,
  )
  type:
    | ProjectionType.PROJECTION_2D
    | ProjectionType.PROJECTION_3D
    | ProjectionType.PROJECTION_4DX;

  @IsString()
  length: number;

  @IsString()
  ageRating: Rating;
}
