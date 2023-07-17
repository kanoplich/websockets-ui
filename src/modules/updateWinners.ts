import { WebSocket } from 'ws';
import { user_db, winners_db } from '../data_base/db.js';

export const updateWinners = (id?: WebSocket) => {
  const user = user_db.find((user) => user.id === id);

  for (const win of winners_db) {
    if (win.name === user?.name) {
      win.wins += 1;

      console.log('update_winners');
      return {
        type: 'update_winners',
        data: JSON.stringify(winners_db),
        id: 0,
      };
    }
  }

  if (user) {
    winners_db.push({ name: user?.name, wins: 1 });
  }

  console.log('update_winners');
  return {
    type: 'update_winners',
    data: JSON.stringify(winners_db),
    id: 0,
  };
};
