import { WebSocketServer } from 'ws';
import { Message } from '../types/type.js';
import { reg } from '../modules/reg.js';
import { updateRoom } from '../modules/updateRoom.js';
import { createGame } from '../modules/createGame.js';
import { updateWinners } from '../modules/updateWinners.js';
import { user_db } from '../data_base/db.js';
import { startGame } from '../modules/startGame.js';
import { turn } from '../modules/turn.js';

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
      // case 'update_winners':
      //   console.log(data.type);
      //   break;
      case 'create_room':
        broadcastMessage(updateRoom(id));
        broadcastMessage(updateWinners());
        break;
      case 'add_user_to_room':
        const create_game = createGame(data, id);
        create_game.forEach((game) => {
          game.id?.send(JSON.stringify(game.data));
        });
        broadcastMessage(updateRoom());
        break;
      // case 'create_game':
      //   console.log(data.type);
      //   break;
      case 'add_ships':
        const start_game = startGame(data, id);
        start_game?.forEach((game) => {
          game.id.send(
            JSON.stringify({
              type: 'start_game',
              data: JSON.stringify({
                idGame: game.idGame,
                ships: game.ships,
                currentPlayerIndex: game.currentPlayerIndex,
              }),
              id: 0,
            })
          );
          game.id.send(JSON.stringify(turn()));
        });
        break;
      // case 'start_game':
      //   console.log(data.type);
      //   break;
      case 'attack':
        console.log(data.type);
        const attack = turn(data);
        if (attack) {
          attack.ws?.forEach((item) => {
            item.id.send(JSON.stringify(attack.resultAttack));
            item.id.send(JSON.stringify(attack.data));
            if (attack.resultAttack.resultGame) {
              item.id.send(JSON.stringify(attack.resultAttack.resultGame));
              if (id === item.id) {
                broadcastMessage(updateWinners(id));
              }
            }
          });
        }
        break;
      // case 'randomAttack':
      //   console.log(data.type);
      //   break;
      // case 'turn':
      //   console.log(data.type);
      //   break;
      // case 'finish':
      //   break;
    }
  });

  ws.on('close', () => {
    const index = user_db.findIndex((user) => user.id === ws);
    user_db.splice(index, 1);
    console.log('Connection close');
  });
});

const broadcastMessage = (message: Message) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};
