import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { extractTokenFromRequest } from '../utils';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/role.enum';

@Injectable()
export class RootAdmin implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const user = this.jwtService.decode(token);
    return user.roles.includes(Role.ROOT_ADMIN);
  }
}
