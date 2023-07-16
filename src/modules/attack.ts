import { ships_db } from '../data_base/db.js';
import { Message } from '../types/type.js';

export const attack = (data: Message) => {
  const res = JSON.parse(data.data);

  for (const ship of ships_db) {
    if (ship.idGame === res.gameId && ship.currentPlayerIndex !== res.indexPlayer) {
      for (const item of ship.ships) {
        const index = item.position.findIndex((item) => item.x === res.x && item.y === res.y);
        if (index !== -1) {
          item.position.splice(index, 1);
          if (item.length === 0) {
            console.log('attack');
            return {
              type: 'attack',
              data: JSON.stringify({
                position: {
                  x: res.x,
                  y: res.y,
                },
                currentPlayer: res.indexPlayer,
                status: 'killed',
              }),
              id: 0,
            };
          } else {
            console.log('attack');
            return {
              type: 'attack',
              data: JSON.stringify({
                position: {
                  x: res.x,
                  y: res.y,
                },
                currentPlayer: res.indexPlayer,
                status: 'shot',
              }),
              id: 0,
            };
          }
        }
      }
    }
  }

  console.log('attack');
  return {
    type: 'attack',
    data: JSON.stringify({
      position: {
        x: res.x,
        y: res.y,
      },
      currentPlayer: res.indexPlayer,
      status: 'miss',
    }),
    id: 0,
  };
};
