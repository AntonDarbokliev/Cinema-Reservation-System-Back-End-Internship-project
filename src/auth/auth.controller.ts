import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { LoginUserDto } from 'src/user/dto/loginUserDto';
import { Public } from './decorator';
import { Role } from 'src/roles/role.enum';
import { RootAdmin } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
  ) {
    try {
      const url = request.url;

      return await this.authService.register(
        createUserDto,
        url.includes('admin') ? [Role.ADMIN] : [Role.USER],
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto, false);
    } catch (error) {
      console.log(error);
    }
  }
  @UseGuards(RootAdmin)
  @Post('register/admin')
  async registerAdmin(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
  ) {
    try {
      const url = request.url;
      return await this.authService.register(
        createUserDto,
        url.includes('admin') ? [Role.ADMIN] : [Role.USER],
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Public()
  @Post('login/admin')
  async loginAdmin(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto, true);
    } catch (error) {
      console.log(error);
    }
  }
}
