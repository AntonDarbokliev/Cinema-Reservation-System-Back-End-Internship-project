import mongoose from 'mongoose';

export interface GetSeatTypeDto {
  name: string;

  price: number;

  cinema: string;

  _id: mongoose.Types.ObjectId;
}
