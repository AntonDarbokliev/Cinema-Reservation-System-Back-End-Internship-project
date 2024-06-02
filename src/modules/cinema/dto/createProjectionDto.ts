import {
  IsBoolean,
  IsDate,
  // IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

enum ProjectionType {
  PROJECTION_2D = '2D',
  PROJECTION_3D = '3D',
  PROJECTION_4DX = '4DX',
}

export class CreateProjection {
  @IsDate()
  // @IsNotEmpty()
  date: Date;

  @IsString()
  // @IsNotEmpty()
  time: string;

  @IsString()
  // @IsNotEmpty()
  cinema: string;

  @IsNumber()
  // @IsNotEmpty()
  hall: number;

  @IsBoolean()
  // @IsNotEmpty()
  isPremiere: boolean;

  @IsString()
  // @IsNotEmpty()
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
  // @IsNotEmpty()
  length: number;

  @IsString()
  // @IsNotEmpty()
  ageRating: string;
}
