import { Message } from '../types/type.js';
import { turn_db, games_db } from '../data_base/db.js';

export const turn = (data?: Message) => {
  if (data) {
    const res = JSON.parse(data?.data);
    const game = turn_db.find((turn) => turn.idGame === res.gameId);
    if (game?.currentPlayer[0] === res.indexPlayer) {
      const currentPlayer = res.indexPlayer === 0 ? 1 : 0;
      game?.currentPlayer.pop();
      game?.currentPlayer.push(currentPlayer);

      const ws = games_db.filter((game) => res.gameId === game.idGame);
      console.log('turn');
      return {
        ws,
        data: {
          type: 'turn',
          data: JSON.stringify({ currentPlayer: currentPlayer }),
          id: 0,
        },
      };
    }
  } else {
    console.log('turn');
    return {
      type: 'turn',
      data: JSON.stringify({ currentPlayer: 0 }),
      id: 0,
    };
  }
};
