import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import type { OnlineEvents, OnlineActions } from "../../../app/network/OnlineEvents";
import type { Camelize } from "../../utils/Camelize";

const ORIGIN = `${location.protocol}//${location.hostname}:3000`;
const ENDPOINT = `${ORIGIN}/online/lobby`;

export function useOnlineEvents(events: OnlineEvents): Camelize<OnlineActions> {
  const [actions, setActions] = useState<Camelize<OnlineActions>>({});

  useEffect(() => {
    const socket: Socket<OnlineEvents, OnlineActions> = io(ENDPOINT);

    socket.on('lobby-updated', events["lobby-updated"]);

    return () => {
      socket.disconnect();
    }
  }, []);

  return actions;
}
