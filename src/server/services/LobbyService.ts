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
    return pick(this.lobby, 'numberOfPlayersOnline', 'rooms');
  }

  playerJoin(player: PlayerConfig, playerId: PlayerId) {
    this.lobby.players.set(playerId, {
      ...player,
      playerId
    });
    this.lobbyEvents.lobbyUpdated(this.lobby);
  }

  createRoom(roomConfig: RoomConfig) {
    this.lobby.rooms.push(roomConfig);
    this.lobbyEvents.lobbyUpdated(this.lobby);
  }
}