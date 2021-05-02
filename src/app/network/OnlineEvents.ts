import { Lobby } from "./OnlineData";

export interface OnlineEvents {
  'lobby-updated': (lobby: Lobby) => void;
}

export interface OnlineActions {

}
