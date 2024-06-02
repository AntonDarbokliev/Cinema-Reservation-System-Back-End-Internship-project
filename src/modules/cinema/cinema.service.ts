import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cinema } from './cinema.schema';
import { CreateCinemaDto } from './dto';
import { EditCinemaDto } from './dto/editCinemaDto';

@Injectable()
export class CinemaService {
  constructor(@InjectModel(Cinema.name) private cinemaModel: Model<Cinema>) {}

  async getAllCinemas() {
    return await this.cinemaModel.find();
  }

  async getCinema(id: string) {
    const cinema = await this.cinemaModel.findById(id).populate('halls');

    return cinema;
  }

  async createCinema(dto: CreateCinemaDto) {
    return await this.cinemaModel.create(dto);
  }

  async updateCinema(id: string, dto: EditCinemaDto) {
    return await this.cinemaModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteCinema(id: string) {
    return await this.cinemaModel.findByIdAndDelete(id);
  }
}
