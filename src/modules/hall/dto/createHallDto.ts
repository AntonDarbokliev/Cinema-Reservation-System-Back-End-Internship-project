import { IsArray, IsNotEmpty, IsString } from 'class-validator';
// import { Types } from 'mongoose';

export enum SeatType {
  SEAT_COMMON = 'Common',
  SEAT_VIP = 'VIP',
  SEAT_COUPLES = 'Couples',
  SEAT_BLANK = 'blank',
}

export interface Row {
  id: string;
  seats: Seat[];
}

export interface Seat {
  type:
    | SeatType.SEAT_COMMON
    | SeatType.SEAT_VIP
    | SeatType.SEAT_COUPLES
    | SeatType.SEAT_BLANK;
  id: string;
}

export class CreateHallDto {
  @IsArray()
  @IsNotEmpty()
  seatsLayout: Row[];

  @IsString()
  @IsNotEmpty()
  cinemaId: string;
}
