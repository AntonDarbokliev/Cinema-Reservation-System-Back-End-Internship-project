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
import { CreateSeatTypeDto } from './dto/createSeatTypeDto';
import { SeatTypeService } from './seat-type.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EditSeatTypeDto } from './dto/editSeatTypeDto';
import { Public } from '../auth/decorator';

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

  @Public()
  @Get(':seatTypeId')
  async getSeatType(@Param('seatTypeId') seatTypeId: string) {
    return await this.seatTypeService.getSeatType(seatTypeId);
  }

  @Patch(':seatTypeId')
  @UseInterceptors(FileInterceptor('image'))
  async editSeatType(
    @Body() dto: EditSeatTypeDto,
    @UploadedFile() image: Express.Multer.File,
    @Param('seatTypeId') seatTypeId: string,
  ) {
    const dataObj = { ...dto };

    let imageUrl: string | null = null;
    if (!dto.image && image) {
      imageUrl = (await this.cloudinaryService.uploadFile(image, false)).url;
    } else if (dto.image) {
      imageUrl = dto.image;
    }

    if (imageUrl) dataObj['image'] = imageUrl;

    return await this.seatTypeService.editSeatType(dataObj, seatTypeId);
  }

  @Delete(':seatTypeId')
  async deleteSeatType(@Param('seatTypeId') seatTypeId: string) {
    return await this.seatTypeService.deleteSeatType(seatTypeId);
  }

  @Get('cinema/:cinemaId')
  async getAllCinemaSeatTypes(@Param('cinemaId') cinemaId: string) {
    return await this.seatTypeService.getAllCinemaSeatTypes(cinemaId);
  }
}
