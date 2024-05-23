import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FoodAndBeverageService } from './food-and-beverage.service';
import { CreateFoodAndBeverage } from './dto/createFoodAndBeverage';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('food-and-beverages')
export class FoodAndBeverageController {
  constructor(
    private foodAndBeverageService: FoodAndBeverageService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get(':cinemaId')
  async getAllFoodAndBeverage(@Param('cinemaId') cinemaId: string) {
    return await this.foodAndBeverageService.getAll(cinemaId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createFoodAndBeverage(
    @Body() dto: CreateFoodAndBeverage,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const imageUrl = (await this.cloudinaryService.uploadFile(image, false))
      .url;

    return await this.foodAndBeverageService.createFoodAndBeverage(
      dto,
      imageUrl,
    );
  }
}
