import { WebSocketServer } from 'ws';
import { Message } from '../types/type.js';
import { handlerUser } from '../modules/handlerUser.js';
import { handlerRoom } from '../modules/handlerRoom.js';

export const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('Connection');

  ws.on('message', (message) => {
    const data: Message = JSON.parse(message as unknown as string);
    const id = ws;
    switch (data.type) {
      case 'reg':
        console.log(data.type);

        const reg = handlerUser(data, id);
        ws.send(JSON.stringify(reg));
        break;
      case 'update_winners':
        console.log(data.type);
        break;
      case 'create_room':
        const create_room = handlerRoom(id);
        console.log(create_room.type);
        broadcastMessage(create_room);
        break;
      case 'add_user_to_room':
        console.log(data.type);
        ws.send(JSON.stringify(data));
        break;
      case 'create_game':
        console.log(data.type);
        break;
      case 'add_ships':
        console.log(data.type);
        break;
      case 'start_game':
        console.log(data.type);
        break;
      case 'attack':
        console.log(data.type);
        break;
      case 'randomAttack':
        console.log(data.type);
        break;
      case 'turn':
        console.log(data.type);
        break;
      case 'finish':
        console.log(data.type);
        break;
    }
  });

  ws.on('close', () => {
    console.log('Connection close');
  });
});

const broadcastMessage = (message: Message) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};
