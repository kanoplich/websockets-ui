import { ships_db } from '../data_base/db.js';

export const finish = (idGame: number, idPlayer: number, idWinner: number) => {
  for (const ship of ships_db) {
    if (ship.idGame === idGame && ship.currentPlayerIndex === idPlayer) {
      let num = 0;
      for (const item of ship.ships) {
        num += item.position.length;
      }
      if (!num) {
        return {
          type: 'finish',
          data: JSON.stringify({
            winPlayer: idWinner,
          }),
          id: 0,
        };
      }
    }
  }
};
