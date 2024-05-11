import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtGuard } from './guard';

@Module({
  providers: [AuthService, { provide: 'APP_GUARD', useClass: JwtGuard }],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: await configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
          // global: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
