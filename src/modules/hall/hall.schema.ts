import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Seat, SeatType } from './dto';
import { HydratedDocument } from 'mongoose';

export type CinemaDocument = HydratedDocument<Hall>;

@Schema()
export class Hall {
  @Prop({ required: true, type: Array })
  seatsLayout: Seat[][];

  @Prop({ type: Number })
  numberOfSeats: number;
}

export const hallSchema = SchemaFactory.createForClass(Hall);

const setSeatCountInHall = (hall: Hall) => {
  const totalHallSeats = hall.seatsLayout.reduce((acc, row) => {
    const rowLengthNoBlanks = row.filter(
      (s) => s.type !== SeatType.SEAT_BLANK,
    ).length;
    return (acc += rowLengthNoBlanks);
  }, 0);
  hall.numberOfSeats = totalHallSeats;
};

hallSchema.pre('save', function (next) {
  setSeatCountInHall(this);
  next();
});

hallSchema.pre('updateOne', function (next) {
  const updatedData: any = this.getUpdate();
  if (updatedData.hasOwnProperty('hallPlans')) {
    setSeatCountInHall(updatedData);
  }
  next();
});
