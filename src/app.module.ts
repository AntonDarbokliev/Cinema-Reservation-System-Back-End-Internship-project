import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseHelperModule } from './mongooseHelper/mongoose.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Let's us use the env variables throughout the whole app;
    }),
    MongooseHelperModule,
    UserModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
