import { PlayerConfig } from "../../app/game/GameData";
import { RoomType, Lobby as LobbyData, Room } from "../../app/network/LobbyData";

export class PlayerId {
  private __nominal: void;
  constructor(public value: string) {}
}

export interface Player extends PlayerConfig {
  playerId: PlayerId;
}

export class Lobby implements LobbyData {
  players = new Map<PlayerId, Player>();
  rooms: Room[] = [...Array(20).keys()].map(i => {
    const playerName = `Player ${i}`;
    return {
      roomId: i.toString(),
      roomName: `${playerName}'s room`,
      player1: playerName,
      player2: "",
      type: RoomType.Private
    }
  });

  public get numberOfPlayersOnline() {
    return this.players.size;
  }
}
