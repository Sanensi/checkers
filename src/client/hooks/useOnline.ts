import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { PlayerConfig } from "../../app/game/GameData";

const ORIGIN = `${location.protocol}//${location.hostname}:3000`;
const ENDPOINT = `${ORIGIN}/online/lobby`;

export function useOnline() {
  const [playerConfig, setPlayerConfig] = useState<PlayerConfig>({ name: '', color: '#0000ff' })

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on('player-init', (num, color) => {
      setPlayerConfig({ name: `Player ${num}`, color })
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