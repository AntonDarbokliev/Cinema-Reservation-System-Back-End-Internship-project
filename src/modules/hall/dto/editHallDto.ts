import { IsArray, IsNotEmpty } from 'class-validator';

enum SeatType {
  SEAT_COMMON = 'Common',
  SEAT_VIP = 'VIP',
  SEAT_COUPLES = 'Couples',
  SEAT_BLANK = 'blank',
}

interface Row {
  id: string;
  seats: Seat[];
}

interface Seat {
  type:
    | SeatType.SEAT_COMMON
    | SeatType.SEAT_VIP
    | SeatType.SEAT_COUPLES
    | SeatType.SEAT_BLANK;
  id: string;
}

export class EditHallDto {
  @IsArray()
  @IsNotEmpty()
  seatsLayout: Row[];
}
