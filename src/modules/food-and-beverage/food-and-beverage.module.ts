import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FoodAndBeverage,
  foodAndBeverageSchema,
} from './food-and-beverage.schema';
import { FoodAndBeverageService } from './food-and-beverage.service';
import { FoodAndBeverageController } from './food-and-bevarage.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FoodAndBeverage.name, schema: foodAndBeverageSchema },
    ]),
    CloudinaryModule,
  ],
  providers: [FoodAndBeverageService],
  controllers: [FoodAndBeverageController],
})
export class FoodAndBeverageModule {}
