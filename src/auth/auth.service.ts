import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/loginUserDto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto, roles: Role[]) {
    try {
      const existingUser = await this.userService.findOne({ email: dto.email });

      if (existingUser) {
        throw new ForbiddenException('Credentials taken');
      }

      return await this.userService.createUser({
        ...dto,
        roles,
      });
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginUserDto, isAdminLogin: boolean) {
    try {
      const user = await this.userService.findOne({ email: dto.email });

      const isMatch = await bcrypt.compare(dto.password, user.password);

      if (
        !isMatch ||
        (isAdminLogin && !user.roles.includes(Role.ADMIN)) ||
        (!isAdminLogin && user.roles.includes(Role.ADMIN))
      ) {
        throw new ForbiddenException('Invalid credentials');
      }

      return {
        access_token: await this.jwtService.signAsync({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles,
        }),
      };
    } catch (error) {
      throw new ForbiddenException('Invalid credentials');
    }
  }
}
