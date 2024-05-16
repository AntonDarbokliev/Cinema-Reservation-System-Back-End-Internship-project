import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hall } from './hall.schema';
import { Model } from 'mongoose';
import { CreateHallDto } from './dto';

@Injectable()
export class HallService {
  constructor(@InjectModel(Hall.name) private hallModel: Model<Hall>) {}

  async getAllHalls() {
    return await this.hallModel.find();
  }

  async getHall(id: string) {
    return await this.hallModel.findById(id);
  }

  async createHall(dto: CreateHallDto) {
    return await this.hallModel.create(dto);
  }

  async updateHall(id: string, dto: CreateHallDto) {
    return await this.hallModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteRow(hallId: string, rowId: string): Promise<Hall> {
    const hall = await this.hallModel.findById(hallId);

    hall.seatsLayout = hall.seatsLayout.filter(
      (row) => String(row._id) !== rowId,
    );

    await hall.save();

    return hall;
  }
}
