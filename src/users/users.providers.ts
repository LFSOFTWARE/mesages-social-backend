import { Connection } from 'mongoose';
import { userSchema } from './schema/user.schema';

export const usersProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Usuarios', userSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
