import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  socketId: string;
  friends: Array<any>;
}
