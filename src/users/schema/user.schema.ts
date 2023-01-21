import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    socketId: String,
    online: Boolean,
    friends: [
      {
        status: { type: Boolean, default: false },
        friend: { type: mongoose.Types.ObjectId, ref: 'Usuarios' },
      },
    ],
  },
  { timestamps: true, collection: 'Usuarios' },
);
