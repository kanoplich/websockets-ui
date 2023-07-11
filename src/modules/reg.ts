import { WebSocket } from 'ws';
import { user_db } from '../data_base/db.js';
import { Message } from '../types/type.js';

export const reg = (data: Message, id: WebSocket) => {
  const user = JSON.parse(data.data);

  if (user.name.length > 4 && user.password.length > 4) {
    for (const item of user_db) {
      if (item.name === user.name) {
        const res = {
          name: user.name,
          index: 0,
          error: true,
          errorText: 'This name is already taken, please enter another name',
        };

        console.log(data.type);
        return {
          type: data.type,
          data: JSON.stringify(res),
          id: 0,
        };
      }
    }

    user_db.push({
      id,
      ...user,
    });

    const res = {
      name: user.name,
      error: false,
    };

    console.log(data.type);
    return {
      type: data.type,
      data: JSON.stringify(res),
      id: data.id,
    };
  } else {
    const res = {
      name: user.name,
      index: 0,
      error: true,
      errorText: 'Invalid username or password',
    };

    console.log(data.type);
    return {
      type: data.type,
      data: JSON.stringify(res),
      id: 0,
    };
  }
};
