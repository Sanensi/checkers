
export enum RoomType {
  Public = 'Public',
  Private = 'Private'
}

export interface Room {
  roomName: string;
  player1?: string;
  player2?: string;
  type: RoomType;
}

export type RoomConfig = Pick<Room, 'roomName' | 'type'>;

export interface Lobby {
  rooms: Room[];
  numberOfPlayersOnline: number;
}