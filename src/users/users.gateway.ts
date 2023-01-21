import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class WebsocketGateway {
  handleConnection(client: any) {
    client.on('login', (data: any) => {
      console.log(data, client?.id);
    });
  }
}
