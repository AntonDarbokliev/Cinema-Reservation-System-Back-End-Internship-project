import { Module } from '@nestjs/common';
import { MongooseHelperService } from './mongoose.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [MongooseHelperService],
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = await configService.get('DB_URI');
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongooseHelperModule {}
