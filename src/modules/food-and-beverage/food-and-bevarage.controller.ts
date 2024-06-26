import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FoodAndBeverageService } from './food-and-beverage.service';
import { CreateFoodAndBeverage } from './dto/createFoodAndBeverage';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EditFoodAndBeverage } from './dto/editFoodAndBeverage';
import { Public } from '../auth/decorator';

@Controller('food-and-beverages')
export class FoodAndBeverageController {
  constructor(
    private foodAndBeverageService: FoodAndBeverageService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Public()
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

  @Patch(':foodAndBeverageId')
  @UseInterceptors(FileInterceptor('image'))
  async editFoodAndBeverage(
    @Body() dto: EditFoodAndBeverage,
    @UploadedFile() image: Express.Multer.File,
    @Param('foodAndBeverageId') foodAndBeverageId: string,
  ) {
    let imageUrl: string;
    if (!dto.image) {
      imageUrl = (await this.cloudinaryService.uploadFile(image, false)).url;
    } else {
      imageUrl = dto.image;
    }

    return await this.foodAndBeverageService.editFoodAndBeverage(
      { ...dto, image: imageUrl },
      foodAndBeverageId,
    );
  }

  @Delete(':foodAndBeverageId')
  async deleteFoodAndBeverage(
    @Param('foodAndBeverageId') foodAndBeverageId: string,
  ) {
    return await this.foodAndBeverageService.deleteFoodAndBeverage(
      foodAndBeverageId,
    );
  }
}
