import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FoodAndBeverage } from './food-and-beverage.schema';
import { Model } from 'mongoose';
import { CreateFoodAndBeverage } from './dto/createFoodAndBeverage';
import { EditFoodAndBeverage } from './dto/editFoodAndBeverage';

@Injectable()
export class FoodAndBeverageService {
  constructor(
    @InjectModel(FoodAndBeverage.name)
    private foodModel: Model<FoodAndBeverage>,
  ) {}

  async getAll(cinemaId: string): Promise<FoodAndBeverage[]> {
    return await this.foodModel.find({ cinemaId: cinemaId });
  }

  async createFoodAndBeverage(dto: CreateFoodAndBeverage, imageUrl: string) {
    return await this.foodModel.create({ ...dto, image: imageUrl });
  }

  async editFoodAndBeverage(dto: EditFoodAndBeverage, foodBeverageId: string) {
    return await this.foodModel.findByIdAndUpdate(foodBeverageId, dto, {
      new: true,
    });
  }

  async deleteFoodAndBeverage(foodBeverageId: string) {
    return await this.foodModel.findByIdAndDelete(foodBeverageId);
  }
}
