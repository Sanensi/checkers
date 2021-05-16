import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import type { LobbyEvents, LobbyActions } from "../../../app/network/LobbyEvents";
import type { Camelize } from "../../../app/utils/Camelize";

const ORIGIN = `${location.protocol}//${location.hostname}:3000`;
const ENDPOINT = `${ORIGIN}/online/lobby`;

export function useLobbyEvents(events: LobbyEvents): Camelize<LobbyActions> {
  const [actions, setActions] = useState<Camelize<LobbyActions>>();

  useEffect(() => {
    const socket: Socket<LobbyEvents, LobbyActions> = io(ENDPOINT);

    socket.on('lobby-updated', events["lobby-updated"]);

    setActions({
      createRoom: (room) => { socket.emit('create-room', room); }
    })

    return () => {
      socket.disconnect();
    }
  }, []);

  return actions;
}
