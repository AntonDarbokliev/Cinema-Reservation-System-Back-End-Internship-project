// import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 5, minUppercase: 1, minNumbers: 1 })
  password: string;

  // @Transform(({ value }) => parseInt(value, 10)) // Transform the string to a number
  roles: number[];
}
