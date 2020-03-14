export interface User {
  id: string;
  nameTH: string;
  nameEN: string;
  surnameTH: string;
  surnameEN: string;
  tel?: string;
};

export interface Room {
  id: string;
  label: string;
  capacity: number;
}
export interface Reservation {
  id: string;
  organization: string;
  userid: string;
  roomid: string;
  room?: Room;
  user?: User;
  status: "pending" | "rejected" | "approved";
  time_start: string;
  time_end: string;
}
