import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SeatType } from './seat-type.schema';
import mongoose, { Model } from 'mongoose';
import { CreateSeatTypeDto } from './dto/createSeatTypeDto';
import { GetSeatTypeDto } from './dto/getSeatTypeDto';

@Injectable()
export class SeatTypeService {
  constructor(
    @InjectModel(SeatType.name) private seatTypeModel: Model<SeatType>,
  ) {}

  async createSeatType(dto: CreateSeatTypeDto, image?: string) {
    const dataObj = { ...dto };
    if (image) dataObj['image'] = image;
    return await this.seatTypeModel.create(dataObj);
  }

  async getAllCinemaSeatTypes(cinemaId: string) {
    const newObjectId = new mongoose.Types.ObjectId();
    // blank seat _id will be different each time the client requests the seat types,
    // but it doesn't matter, we just need all the blank seats to have an the same id,
    // at a single moment, no matter what it is next time.
    const blankSeatType: GetSeatTypeDto = {
      _id: newObjectId,
      name: 'blank',
      price: 0,
      cinema: cinemaId,
    };
    const seatTypes = await this.seatTypeModel.find({ cinema: cinemaId });
    return [blankSeatType, ...seatTypes];
  }
}
