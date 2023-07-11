import { WebSocketServer } from 'ws';
import { Message } from '../types/type.js';
import { reg } from '../modules/reg.js';
import { updateRoom } from '../modules/updateRoom.js';
import { createGame } from '../modules/createGame.js';
import { updateWinners } from '../modules/updateWinners.js';

export const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('Connection');

  ws.on('message', (message) => {
    const data: Message = JSON.parse(message as unknown as string);
    const id = ws;
    switch (data.type) {
      case 'reg':
        ws.send(JSON.stringify(reg(data, id)));
        broadcastMessage(updateRoom());
        broadcastMessage(updateWinners());
        break;
      case 'update_winners':
        console.log(data.type);
        break;
      case 'create_room':
        broadcastMessage(updateRoom(id));
        broadcastMessage(updateWinners());
        break;
      case 'add_user_to_room':
        const create_game = createGame(data, id);
        create_game.forEach((game) => {
          console.log(game.data.type);
          game.id?.send(JSON.stringify(game.data));
        });
        broadcastMessage(updateRoom());
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
        broadcastMessage(updateWinners(id));
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
