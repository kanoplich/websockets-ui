import { Message, Ships } from '../types/type.js';
import { games_db, ships_db } from '../data_base/db.js';
import { WebSocket } from 'ws';

export const startGame = (data: Message, id: WebSocket) => {
  const response = JSON.parse(data.data);

  const searchGame = games_db.filter((game) => game.idGame === response.gameId);

  const ships = response.ships.map((item: Ships) => {
    if (item.type === 'huge') {
      if (item.direction) {
        const positions = [
          { x: item.position.x, y: item.position.y },
          { x: item.position.x, y: item.position.y + 1 },
          { x: item.position.x, y: item.position.y + 2 },
          { x: item.position.x, y: item.position.y + 3 },
        ];
        return {
          position: positions,
        };
      } else {
        const positions = [
          { x: item.position.x, y: item.position.y },
          { x: item.position.x + 1, y: item.position.y },
          { x: item.position.x + 2, y: item.position.y },
          { x: item.position.x + 3, y: item.position.y },
        ];
        return {
          position: positions,
        };
      }
    } else if (item.type === 'large') {
      if (item.direction) {
        const positions = [
          { x: item.position.x, y: item.position.y },
          { x: item.position.x, y: item.position.y + 1 },
          { x: item.position.x, y: item.position.y + 2 },
        ];
        return {
          position: positions,
        };
      } else {
        const positions = [
          { x: item.position.x, y: item.position.y },
          { x: item.position.x + 1, y: item.position.y },
          { x: item.position.x + 2, y: item.position.y },
        ];
        return {
          position: positions,
        };
      }
    } else if (item.type === 'medium') {
      if (item.direction) {
        const positions = [
          { x: item.position.x, y: item.position.y },
          { x: item.position.x, y: item.position.y + 1 },
        ];
        return {
          position: positions,
        };
      } else {
        const positions = [
          { x: item.position.x, y: item.position.y },
          { x: item.position.x + 1, y: item.position.y },
        ];
        return {
          position: positions,
        };
      }
    } else {
      return {
        position: [item.position],
      };
    }
  });

  if (searchGame.length === 0) {
    ships_db.push({
      id: id,
      idGame: response.gameId,
      ships,
      currentPlayerIndex: response.indexPlayer,
    });

    games_db.push({
      id: id,
      idGame: response.gameId,
      ships: response.ships,
      currentPlayerIndex: response.indexPlayer,
    });
  } else if (searchGame.length === 1) {
    ships_db.push({
      id: id,
      idGame: response.gameId,
      ships,
      currentPlayerIndex: response.indexPlayer,
    });

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
