import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 5, minUppercase: 1, minNumbers: 1 })
  password: string;
}
