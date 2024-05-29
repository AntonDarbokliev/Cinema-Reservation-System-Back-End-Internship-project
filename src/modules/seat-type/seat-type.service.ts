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

  async createSeatType(dto: CreateSeatTypeDto) {
    return await this.seatTypeModel.create(dto);
  }

  async getAllCinemaSeatTypes(cinemaId: string) {
    const newObjectId = new mongoose.Types.ObjectId();

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
