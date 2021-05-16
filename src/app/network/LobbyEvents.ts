import { PlayerConfig } from "../game/GameData";
import { Lobby } from "./LobbyData";

export interface LobbyEvents {
  'lobby-updated': (lobby: Lobby) => void;
}

export interface LobbyActions {
  'join-lobby': (player: PlayerConfig) => void;
}
