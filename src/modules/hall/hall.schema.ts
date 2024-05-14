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

const seatCountInHall = (hall: Hall) => {
  const totalHallSeats = hall.seatsLayout.reduce((acc, row) => {
    const rowLengthNoBlanks = row.filter(
      (s) => s !== SeatType.SEAT_BLANK,
    ).length;
    return (acc += rowLengthNoBlanks);
  }, 0);

  return totalHallSeats;
};

hallSchema.pre('save', function (next) {
  const totalHallSeats = seatCountInHall(this);
  this.numberOfSeats = totalHallSeats;
  next();
});

// Post (not pre) to ensure that the new seats have been added so we can count them.
// Otherwise it would be one request behind, though it returns the old seat count, but still updates it correctly.
hallSchema.post('findOneAndUpdate', async function () {
  const data = await this.model.findOne(this.getQuery());

  const totalHallSeats = seatCountInHall(data);
  data.numberOfSeats = totalHallSeats;

  await data.save();
});
