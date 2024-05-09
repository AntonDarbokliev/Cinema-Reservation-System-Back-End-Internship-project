import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../user/dto/loginUserDto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../roles/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto, roles: Role[]) {
    const existingUser = await this.userService.findOne({ email: dto.email });

    if (existingUser) {
      throw new ForbiddenException('Credentials taken');
    }

    return await this.userService.createUser({
      ...dto,
      roles,
    });
  }

  async login(dto: LoginUserDto, isAdminLogin: boolean) {
    const user = await this.userService.findOne({ email: dto.email });

    const isMatch = await bcrypt.compare(dto.password, user.password);

    const isUserAdmin = user.roles.some((role) => role <= Role.ADMIN);
    if (
      !isMatch ||
      (isAdminLogin && !isUserAdmin) ||
      (!isAdminLogin && isUserAdmin)
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
  }
}
