import { IsNotEmpty, IsString } from 'class-validator';

export class GetProjectionDto {
  @IsString()
  @IsNotEmpty()
  projectionId: string;
}
