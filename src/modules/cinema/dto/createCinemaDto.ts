import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCinemaDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
