import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SeatType } from './dto';
import { HydratedDocument } from 'mongoose';

export type CinemaDocument = HydratedDocument<Hall>;

@Schema()
export class Seat {
  @Prop({ type: String, required: true })
  type: SeatType;
}
@Schema()
export class Row {
  @Prop({ type: Array(Seat) })
  seats: Seat[];
  _id: string;
}

@Schema()
export class Hall {
  @Prop({ required: true, type: Array(Row) })
  seatsLayout: Row[];

  @Prop({ type: Number })
  numberOfSeats: number;

  @Prop({ type: String, default: '' })
  cinemaId: string;
}
export const seatSchema = SchemaFactory.createForClass(Seat);
export const rowSchema = SchemaFactory.createForClass(Row);
export const hallSchema = SchemaFactory.createForClass(Hall);

const seatCountInHall = (hall: Hall) => {
  const totalHallSeats = hall.seatsLayout.reduce((acc, row) => {
    const rowLengthNoBlanks = row.seats.filter(
      (s) => s.type !== SeatType.SEAT_BLANK,
    ).length;
    return (acc += rowLengthNoBlanks);
  }, 0);

  return totalHallSeats;
};

hallSchema.pre('save', function (next) {
  const totalHallSeats = seatCountInHall(this);
  this.numberOfSeats = totalHallSeats;
  if (this.cinemaId.length <= 0 && this.isNew) {
    throw new Error('Cinema id is required when initially creating a hall');
  }
  next();
});

// Post (not pre) to ensure that the new seats have been added so we can count them.
// Otherwise it would be one request behind, though it returns the old seat count, but still updates it correctly.
hallSchema.post('findOneAndUpdate', async function () {
  const hall = await this.model.findOne(this.getQuery());

  const totalHallSeats = seatCountInHall(hall);
  hall.numberOfSeats = totalHallSeats;

  await hall.save();
});
