import { Lobby, RoomConfig } from "./LobbyData";

export interface LobbyEvents {
  'lobby-updated': (lobby: Lobby) => void;
}

export interface LobbyActions {
  'create-room': (room: RoomConfig) => void;
}
