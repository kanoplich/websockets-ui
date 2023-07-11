import { WebSocket } from 'ws';
import { room_db, user_db } from '../data_base/db.js';
import { Message } from '../types/type.js';

export const updateRoom = (id?: WebSocket): Message => {
  if (id) {
    const user = user_db.find((user) => user.id === id);

    for (const room of room_db) {
      if (room.roomUsers[0].name === user?.name) {
        const data = JSON.stringify(room_db);

        console.log('update_room');
        return {
          type: 'update_room',
          data,
          id: 0,
        };
      }
    }

    const roomId = Date.now();
    room_db.push({ roomId, roomUsers: [{ name: `${user?.name}`, index: 0 }] });

    const data = JSON.stringify(room_db);

    console.log('update_room');
    return {
      type: 'update_room',
      data,
      id: 0,
    };
  } else {
    const data = JSON.stringify(room_db);

    console.log('update_room');
    return {
      type: 'update_room',
      data,
      id: 0,
    };
  }
};
