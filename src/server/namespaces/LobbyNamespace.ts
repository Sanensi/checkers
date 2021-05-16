import { Namespace } from "socket.io";
import { Lobby } from "../../app/network/LobbyData";
import { LobbyActions, LobbyEvents } from "../../app/network/LobbyEvents";
import { playerIdFromString } from "../domain/Lobby";
import { LobbyService, LobbyServiceEvents } from "../services/LobbyService";

type Events = LobbyEvents & LobbyActions;

export function setupOnlineEvents(ns: Namespace<Events>): LobbyServiceEvents {
  return {
    lobbyUpdated: (lobby: Lobby) => {
      ns.emit('lobby-updated', lobby);
    }
  }
}

export function setupOnlineActions(ns: Namespace<Events>, lobbySevice: LobbyService) {
  ns.on('connection', (socket) => {
    console.log(`${socket.id} has connected!`);
    socket.emit('lobby-updated', lobbySevice.getLobbyData());

    socket.on('join-lobby', (playerConfig) => {
      console.log('player-joined', playerConfig);

      lobbySevice.playerJoined(playerConfig, playerIdFromString(socket.id));
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} has disconnected`);

      lobbySevice.playerLeft(playerIdFromString(socket.id));
    });
  });
}
