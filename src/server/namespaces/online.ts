import { Namespace } from "socket.io";
import { PlayerConfig } from "../../app/game/GameData";
import { Lobby as LobbyData } from "../../app/network/OnlineData";
import { OnlineActions, OnlineEvents } from "../../app/network/OnlineEvents";

type Events = OnlineEvents & OnlineActions;

interface Player extends PlayerConfig {
  socketId: string;
}

interface Lobby extends LobbyData {
  players: Player[];
}

const lobby: Lobby = {
  players: [],
  rooms: [],
  numberOfPlayersInMatchmaking: 0
}

export function setupOnline(ns: Namespace<Events>) {
  ns.on('connection', (socket) => {
    console.log(`${socket.id} has connected!`);

    const num = Math.ceil(Math.random() * 1000);
    const color = '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0');
    socket.emit('player-init', num, color);

    socket.on('create-player', (config: PlayerConfig) => {
      console.log(config);
      lobby.players.push({ ...config, socketId: socket.id });
      socket.emit('lobby-joined', lobby);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} has disconnected`);
    });
  });
}
