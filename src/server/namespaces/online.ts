import { Namespace } from "socket.io";
import { PlayerConfig } from "../../app/game/GameData";
import { Lobby as LobbyData, RoomType } from "../../app/network/OnlineData";
import { OnlineActions, OnlineEvents } from "../../app/network/OnlineEvents";
import { pick } from "../utils/pick";

type Events = OnlineEvents & OnlineActions;

interface Player extends PlayerConfig {
  socketId: string;
}

interface Lobby extends LobbyData {
  players: Player[];
}

const lobby: Lobby = {
  players: [],
  rooms: [...Array(20).keys()].map(i => {
    const playerName = `Player ${i}`;
    return {
      roomName: `${playerName}'s room`,
      player1: playerName,
      player2: "",
      type: RoomType.Private
    }
  }),
  numberOfPlayersInMatchmaking: 0
}

export function setupOnline(ns: Namespace<Events>) {
  ns.on('connection', (socket) => {
    console.log(`${socket.id} has connected!`);

    socket.emit('lobby-updated', pick(lobby, 'numberOfPlayersInMatchmaking', 'rooms'));

    socket.on('disconnect', () => {
      console.log(`${socket.id} has disconnected`);
    });
  });
}
