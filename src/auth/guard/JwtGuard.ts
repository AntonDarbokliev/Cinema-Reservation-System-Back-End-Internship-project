import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  extractTokenFromRequest(request: Request): string | undefined {
    const [type, token] = request.headers['Authorization'].split(' ');
    return type == 'Bearer' ? token : undefined;
  }
}
