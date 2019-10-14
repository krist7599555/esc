import { User as U } from './user';
import { Room as R } from './room';
declare global {
  interface User extends U {}
  interface Room extends R {}
}
