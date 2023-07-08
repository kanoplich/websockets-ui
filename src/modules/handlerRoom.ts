import { WebSocket } from 'ws';
import { room_db } from '../data_base/db.js';
import { Message } from '../types/type.js';

export const handlerRoom = (id: WebSocket): Message => {
  const indexRoom = Date.now();
  room_db.push({ indexRoom, id });

  const data = JSON.stringify([{ roomId: 0, roomUsers: [{ name: '', index: 0 }] }]);

  return {
    type: 'update_room',
    data,
    id: 0,
  };
};
