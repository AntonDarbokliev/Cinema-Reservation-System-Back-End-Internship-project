import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hall } from './hall.schema';
import { Model } from 'mongoose';
import { CreateHallDto } from './dto';

@Injectable()
export class HallService {
  constructor(@InjectModel(Hall.name) private hallModel: Model<Hall>) {}

  async getHalls() {
    return await this.hallModel.find();
  }

  async createHall(dto: CreateHallDto) {
    return await this.hallModel.create(dto);
  }
}
