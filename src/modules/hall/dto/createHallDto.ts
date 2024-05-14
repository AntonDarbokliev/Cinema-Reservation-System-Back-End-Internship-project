import { IsArray, IsNotEmpty } from 'class-validator';

export enum SeatType {
  SEAT_COMMON = 'Common',
  SEAT_VIP = 'VIP',
  SEAT_COUPLES = 'Couples',
  SEAT_BLANK = 'blank',
}

export type Seat =
  | SeatType.SEAT_COMMON
  | SeatType.SEAT_VIP
  | SeatType.SEAT_COUPLES
  | SeatType.SEAT_BLANK;

export class CreateHallDto {
  @IsArray()
  @IsNotEmpty()
  seatsLayout: Seat[][];
}
