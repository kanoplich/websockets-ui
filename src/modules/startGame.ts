import { Message } from '../types/type.js';
import { games_db } from '../data_base/db.js';
import { WebSocket } from 'ws';

export const startGame = (data: Message, id: WebSocket) => {
  const response = JSON.parse(data.data);

  const searchGame = games_db.filter((game) => game.idGame === response.gameId);

  if (searchGame.length === 0) {
    games_db.push({
      id: id,
      idGame: response.gameId,
      ships: response.ships,
      currentPlayerIndex: response.indexPlayer,
    });
  } else if (searchGame.length === 1) {
    games_db.push({
      id: id,
      idGame: response.gameId,
      ships: response.ships,
      currentPlayerIndex: response.indexPlayer,
    });

    const filter = games_db.filter((game) => game.idGame === response.gameId);

    console.log('start_game');
    return filter;
  }
};
