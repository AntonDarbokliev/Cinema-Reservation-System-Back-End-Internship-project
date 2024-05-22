import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  cinemaId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
