import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseHelperModule } from './modules/mongooseHelper/mongoose.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { CinemaModule } from './modules/cinema/cinema.module';
import { HallModule } from './modules/hall/hall.module';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Let's us use the env variables throughout the whole app;
    }),
    MongooseHelperModule,
    UserModule,
    AuthModule,
    RolesModule,
    CinemaModule,
    HallModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
