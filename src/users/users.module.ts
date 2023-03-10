import { WebsocketGateway } from './users.gateway';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, WebsocketGateway],
})
export class UsersModule {}
