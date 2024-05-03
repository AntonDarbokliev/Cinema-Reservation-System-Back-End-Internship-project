import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
}
