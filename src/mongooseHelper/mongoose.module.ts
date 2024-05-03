import { Module } from '@nestjs/common';
import { MongooseHelperService } from './mongoose.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [MongooseHelperService],
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get('DB_URI');
        console.log('Connecting to ' + uri);

        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongooseHelperModule {}
