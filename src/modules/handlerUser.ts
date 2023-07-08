import { WebSocket } from 'ws';
import { user_db } from '../data_base/db.js';
import { Message } from '../types/type.js';

export const handlerUser = (data: Message, id: WebSocket) => {
  const user = JSON.parse(data.data);
  user_db.push({
    id,
    ...user,
    error: false,
    index: user_db.length,
    errorText: '',
  });

  const res = {
    name: user.name,
    error: false,
  };

  return {
    type: data.type,
    data: JSON.stringify(res),
    id: data.id,
  };
};
