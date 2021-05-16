import { PlayerConfig } from "../../app/game/GameData";
import { RoomType, Lobby as LobbyData, Room } from "../../app/network/LobbyData";

const PlayerIdSymbol = Symbol();
export type PlayerId = Nominal<string, typeof PlayerIdSymbol>;
export function playerIdFromString(value: string): PlayerId {
  return value as PlayerId;
}

export interface Player extends PlayerConfig {
  playerId: PlayerId;
}

export class Lobby implements LobbyData {
  players = new Map<PlayerId, Player>();
  rooms = [];
  // rooms: Room[] = [...Array(20).keys()].map(i => {
  //   const playerName = `Player ${i}`;
  //   return {
  //     roomId: i.toString(),
  //     roomName: `${playerName}'s room`,
  //     player1: playerName,
  //     player2: "",
  //     type: RoomType.Private
  //   }
  // });

  public get numberOfPlayersOnline() {
    return this.players.size;
  }
}
