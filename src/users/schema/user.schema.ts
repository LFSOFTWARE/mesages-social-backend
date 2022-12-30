import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    socketId: String,
  },
  { timestamps: true, collection: 'Usuarios' },
);
