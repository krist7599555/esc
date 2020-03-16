export interface Reservation {
  id?:          string;
  roomid:       string;
  userid:       string;
  organization: string;
  time_start:   number | Date;
  time_end:     number | Date;
}
