import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSeatTypeDto } from './dto/createSeatTypeDto';
import { SeatTypeService } from './seat-type.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('seat-types')
export class SeatTypeController {
  constructor(
    private seatTypeService: SeatTypeService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createSeatType(
    @Body() dto: CreateSeatTypeDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    let imageUrl: string | null = null;
    if (image) {
      imageUrl = (await this.cloudinaryService.uploadFile(image, false)).url;
    }

    return await this.seatTypeService.createSeatType(dto, imageUrl);
  }

  @Get(':cinemaId')
  async getAllCinemaSeatTypes(@Param('cinemaId') cinemaId: string) {
    return await this.seatTypeService.getAllCinemaSeatTypes(cinemaId);
  }
}
