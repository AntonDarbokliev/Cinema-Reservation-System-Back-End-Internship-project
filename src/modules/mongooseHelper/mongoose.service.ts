import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '../roles/role.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class MongooseHelperService implements OnApplicationBootstrap {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}
  async dbInitializationRoutine() {
    const rootAdmin = await this.userService.findOne({
      roles: [Role.ROOT_ADMIN],
    });

    if (!rootAdmin) {
      await this.userService.createUser({
        email: this.configService.get('ROOT_ADMIN_EMAIL'),
        firstName: 'ROOT',
        lastName: 'ADMIN',
        password: this.configService.get('ROOT_ADMIN_PASSWORD'),
        roles: [Role.ROOT_ADMIN],
      });
    }
  }

  async onApplicationBootstrap() {
    await this.dbInitializationRoutine();
  }
}
