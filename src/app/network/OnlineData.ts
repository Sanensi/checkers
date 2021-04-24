
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

export interface Lobby {
  rooms: Room[];
  numberOfPlayersInMatchmaking: number;
}