import { PlayerConfig } from "../game/GameData";
import { Lobby } from "./OnlineData";

export interface OnlineEvents {
  'player-init': (num: number, color: string) => void;
  'lobby-joined': (lobby: Lobby) => void;
}

export interface OnlineActions {
  'create-player': (config: PlayerConfig) => void;
}
