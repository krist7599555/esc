export interface Room {
  title: string;
  description: string;
  start: Date;
  end: Date;
  room: string;
  owner: string;
  editor: string;
  status: 'approved' | 'waiting' | 'rejected';
}
