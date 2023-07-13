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
}

export interface Room {
  roomId: number;
  roomUsers: RoomUsers[];
}

interface RoomUsers {
  name: string;
  index: number;
}

export interface Game {
  idGame: number;
  idPlayer: number;
}

export interface RoomUpdate {
  roomId: Room;
  roomUse: User;
}

export interface Winners {
  name: string;
  wins: number;
}

export interface Games {
  id: WebSocket;
  idGame: number;
  ships: Ships[];
  currentPlayerIndex: number;
}

interface Ships {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface Turn {
  idGame: number;
  currentPlayer: number[];
}
