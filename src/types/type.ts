import { WebSocket } from 'ws';

export interface Message {
  id: number;
  type: string;
  data: string;
}

export interface User {
  id: WebSocket;
  index: number;
  name: string;
  password: string;
  error: boolean;
  errorText: string;
}

export interface Room {
  indexRoom: number;
  id: WebSocket;
}

export interface Game {
  idGame: number;
  idPlayer: number;
}

export interface RoomUpdate {
  roomId: Room;
  roomUse: User;
}
