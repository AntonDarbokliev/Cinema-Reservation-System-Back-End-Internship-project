import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Hall } from '../hall/hall.schema';
import { Cinema } from '../cinema/cinema.schema';
import { ProjectionType } from './dto/projectionType';
import { Movie } from '../movie/movie.schema';
import { Reservation } from '../reservation/reservation.schema';
import { Ticket } from '../ticket/ticket.schema';
// import * as moment from 'moment';

export enum ProjectionStatus {
  PROJECTION_SCHEDULED = 'Scheduled',
  PROJECTION_AWAITING = 'Awaiting',
  PROJECTION_RUNNING = 'Running',
  PROJECTION_ENDED = 'Ended',
}

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Projection {
  @Prop({ type: String, required: true })
  startTime: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true,
  })
  cinema: Cinema;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hall',
    required: true,
  })
  hall: Hall;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  })
  movie: Movie;

  @Prop({ type: String, required: true })
  projectionType: ProjectionType;

  @Prop({ type: Number, required: true })
  baseTicketPrice: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
    default: [],
  })
  reservations: Reservation[];

  status: ProjectionStatus;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
    default: [],
  })
  tickets: Ticket[];
}
export const projectionSchema = SchemaFactory.createForClass(Projection);

projectionSchema.virtual('status').get(function (this: Projection) {
  const thirtyMinutesMilliseconds = 30 * 60 * 1000;

  const projectionStartComponents = this.startTime.split(':');
  const projectionStartHours = parseInt(projectionStartComponents[0], 10);
  const projectionStartMinutes = parseInt(projectionStartComponents[1], 10);

  const projectionStart = new Date(this.startDate);
  projectionStart.setUTCHours(projectionStartHours, projectionStartMinutes);
  const projectionLengthHours = Number(this.movie.length) / 60;

  const projectionEnd = new Date(
    projectionStart.getTime() + projectionLengthHours * 60 * 60 * 1000,
  ).getTime();

  const currentTime = new Date();
  const localOffset = Number(process.env.UTC_TIME_OFFSET);
  // const localOffset = Number(process.env.UTC_TIME_OFFSET);
  // const [hours, minutes] = moment().format('HH:mm').split(':');
  // currentTime.setHours(Number(hours));
  // currentTime.setMinutes(Number(minutes));

  if (localOffset < 0) {
    currentTime.setHours(currentTime.getHours() + Math.abs(localOffset));
  } else {
    currentTime.setHours(currentTime.getHours() - localOffset);
  }
  let status: ProjectionStatus = ProjectionStatus.PROJECTION_SCHEDULED;

  if (currentTime.getTime() > projectionEnd) {
    status = ProjectionStatus.PROJECTION_ENDED;
  } else if (
    currentTime.getTime() > projectionStart.getTime() &&
    currentTime.getTime() < projectionEnd
  ) {
    status = ProjectionStatus.PROJECTION_RUNNING;
  } else if (
    projectionStart.getTime() - currentTime.getTime() <=
    thirtyMinutesMilliseconds
  ) {
    status = ProjectionStatus.PROJECTION_AWAITING;
  }
  return status;
});
