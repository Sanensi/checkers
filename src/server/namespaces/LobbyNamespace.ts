import { Namespace } from "socket.io";
import { Lobby } from "../../app/network/LobbyData";
import { LobbyActions, LobbyEvents } from "../../app/network/LobbyEvents";
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

    socket.on('disconnect', () => {
      console.log(`${socket.id} has disconnected`);
    });
  });
}
