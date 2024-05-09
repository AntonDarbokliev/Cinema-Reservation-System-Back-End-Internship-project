import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { LoginUserDto } from '../user/dto/';
import { Public } from './decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/guard';
import { Roles } from '../roles/decorator/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto, [Role.USER]);
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto, false);
  }

  @UseGuards(RolesGuard)
  @Roles([Role.ROOT_ADMIN])
  @Post('register/admin')
  async registerAdmin(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
  ) {
    const url = request.url;
    return await this.authService.register(
      createUserDto,
      url.includes('admin') ? [Role.ADMIN] : [Role.USER],
    );
  }

  @Public()
  @Post('login/admin')
  async loginAdmin(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto, true);
  }
}
