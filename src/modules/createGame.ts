import { Message } from '../types/type.js';
import { room_db, turn_db, user_db } from '../data_base/db.js';
import { WebSocket } from 'ws';

export const createGame = (data: Message, id: WebSocket) => {
  const index = JSON.parse(data.data);
  const room = room_db.find((room) => room.roomId === index.indexRoom);

  const user = user_db.find((user) => user.name === room?.roomUsers[0].name);

  if (user?.id === id) {
    return [];
  } else {
    const delIndex = room_db.findIndex((room) => room.roomId === index.indexRoom);
    room_db.splice(delIndex, 1);

    const delUserIndex = room_db.findIndex((room) => room.roomUsers[0].name === user?.name);
    if (delUserIndex !== -1) room_db.splice(delUserIndex, 1);

    const firstPlayer = {
      idGame: index.indexRoom,
      idPlayer: 0,
    };
    const secondPlayer = {
      idGame: index.indexRoom,
      idPlayer: 1,
    };

    const players = [
      { id: user?.id, data: { type: 'create_game', data: JSON.stringify(firstPlayer), id: 0 } },
      { id, data: { type: 'create_game', data: JSON.stringify(secondPlayer), id: 1 } },
    ];

    turn_db.push({ idGame: index.indexRoom, currentPlayer: [0] });

    console.log('create_game');
    return players;
  }
};
