import { OnModuleInit } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

import { Server } from 'socket.io';
@WebSocketGateway()
export class WebsocketGateway implements OnModuleInit {
  private logger: Logger = new Logger(WebsocketGateway.name);

  @WebSocketServer()
  server: Server;
  constructor(private readonly usersService: UsersService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id, 'connection');
    });
  }
  @SubscribeMessage('login')
  onLogin(client: any, data: any) {
    const { user } = data;
    const update: UpdateUserDto = { socketId: client?.id, online: true };
    this.usersService.update(user._id, update);
  }

  @SubscribeMessage('disconnect')
  teste(client: any, data: any) {
    console.log(client.id, 'disconet');
  }

  async handleDisconnect(client: any) {
    const user = await this.usersService.findBySocket(client.id);
    const update: UpdateUserDto = { socketId: null, online: false };
    this.usersService.update(user._id, update);
  }
}
