import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/loginUserDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    try {
      const existingUser = await this.userService.findOne(dto.email);

      if (existingUser) {
        throw new ForbiddenException('Credentials taken');
      }

      const hashedPass = await bcrypt.hash(dto.password, 10);
      return await this.userService.createUser({
        ...dto,
        password: hashedPass,
      });
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginUserDto) {
    try {
      const user = await this.userService.findOne(dto.email);

      const isMatch = await bcrypt.compare(dto.password, user.password);

      if (!isMatch) {
        throw new ForbiddenException('Invalid credentials');
      }

      return {
        access_token: await this.jwtService.signAsync(dto),
      };
    } catch (error) {
      throw new ForbiddenException('Invalid credentials');
    }
  }
}
