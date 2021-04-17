import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { defaultGameConfig } from "../../app/game/GameData";

const ORIGIN = `${location.protocol}//${location.hostname}:3000`;
const ENDPOINT = `${ORIGIN}/online/lobby`;

export function useOnline() {
  const [playerConfig, setPlayerConfig] = useState(defaultGameConfig.player1)

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on('player-num', (num) => {
      setPlayerConfig((prev) => ({ ...prev, name: `Player ${num}` }))
    });

    return () => {
      console.log('disconnecting')
      socket.disconnect();

    }
  }, []);

  return {
    playerConfig,
    setPlayerConfig
  };
}