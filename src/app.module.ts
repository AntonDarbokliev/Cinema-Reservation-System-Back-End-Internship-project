import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseHelperModule } from './mongooseHelper/mongoose.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Let's us use the env variables throughout the whole app;
    }),
    MongooseHelperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
