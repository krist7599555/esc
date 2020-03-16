export const RESERVATIONS_STATUS = ['pending', 'approved', 'rejected'] as const;
export type ReservationStatus = typeof RESERVATIONS_STATUS[number]

export interface Reservation {
  id?:          string;
  roomid:       string;
  userid:       string;
  organization: string;
  time_start:   number | Date;
  time_end:     number | Date;
  status:       ReservationStatus;
}
