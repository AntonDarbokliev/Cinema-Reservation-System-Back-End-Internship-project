import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(dto: CreateUserDto) {
    const createdUser = await this.userModel.create(dto);
    return createdUser;
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async getAll() {
    return await this.userModel.find();
  }
}
