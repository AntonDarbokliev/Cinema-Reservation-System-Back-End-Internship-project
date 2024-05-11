enum SeatType {
  SEAT_COMMON = 'Common',
  SEAT_VIP = 'VIP',
  SEAT_COUPLES = 'Couples',
}

interface Seat {
  number: number;
  type: SeatType.SEAT_COMMON | SeatType.SEAT_VIP | SeatType.SEAT_COUPLES;
}

export interface CreateHallPlan {
  numberOfSeats: number;
  seatsLayout: Seat[][];
}
