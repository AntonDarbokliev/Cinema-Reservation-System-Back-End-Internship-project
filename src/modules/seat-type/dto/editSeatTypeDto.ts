import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditSeatTypeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  price?: number;

  @IsString()
  @IsOptional()
  cinema?: string;

  @IsString()
  @IsOptional()
  image?: string;
}
