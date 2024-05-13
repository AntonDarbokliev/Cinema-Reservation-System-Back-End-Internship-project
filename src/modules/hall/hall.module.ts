import { Module } from '@nestjs/common';
import { HallController } from './hall.controller';
import { HallService } from './hall.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hall, hallSchema } from './hall.schema';

@Module({
  controllers: [HallController],
  providers: [HallService],
  imports: [
    MongooseModule.forFeature([{ name: Hall.name, schema: hallSchema }]),
  ],
})
export class HallModule {}
