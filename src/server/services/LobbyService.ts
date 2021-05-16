import { Lobby, PlayerId } from "../domain/Lobby"
import { Lobby as LobbyData, RoomConfig } from "../../app/network/LobbyData";
import { pick } from "../utils/pick";
import { PlayerConfig } from "../../app/game/GameData";
import { Camelize } from "../../app/utils/Camelize";
import { LobbyEvents } from "../../app/network/LobbyEvents";

export type LobbyServiceEvents = Camelize<LobbyEvents>;

export class LobbyService {
  private lobby = new Lobby();

  constructor(
    private lobbyEvents: LobbyServiceEvents
  ) {}

  getLobbyData(): LobbyData {
    console.log(this.lobby);
    return pick(this.lobby, 'numberOfPlayersOnline', 'rooms');
  }

  playerJoined(player: PlayerConfig, playerId: PlayerId) {
    this.lobby.players.set(playerId, {
      ...player,
      playerId
    });
    this.lobbyEvents.lobbyUpdated(this.getLobbyData());
  }

  playerLeft(playerId: PlayerId) {
    this.lobby.players.delete(playerId);
    this.lobbyEvents.lobbyUpdated(this.getLobbyData());
  }

  createRoom(roomConfig: RoomConfig) {
    this.lobby.rooms.push(roomConfig);
    this.lobbyEvents.lobbyUpdated(this.getLobbyData());
  }
}