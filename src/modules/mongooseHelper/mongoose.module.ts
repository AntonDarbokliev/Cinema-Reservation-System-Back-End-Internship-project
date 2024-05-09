import { Module } from '@nestjs/common';
import { MongooseHelperService } from './mongoose.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';

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
    UserModule,
  ],
})
export class MongooseHelperModule {}
