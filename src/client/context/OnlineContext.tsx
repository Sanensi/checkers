import React, { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { PlayerConfig } from "../../app/game/GameData";

interface OnlineEvents {
  'player-init': (num: number, color: string) => void;
}

interface OnlineState {
  player: {
    config: PlayerConfig;
    setConfig: (config: PlayerConfig) => void;
  }
}

const ORIGIN = `${location.protocol}//${location.hostname}:3000`;
const ENDPOINT = `${ORIGIN}/online/lobby`;

const OnlineContext = React.createContext<OnlineState>(undefined);

export const OnlineContextProvider: React.FC = ({ children }) => {
  const [playerConfig, setPlayerConfig] = useState({ name: '', color: '#0000ff' });

  useEffect(() => {
    const socket: Socket<OnlineEvents> = io(ENDPOINT);

    socket.on('player-init', (num, color) => {
      setPlayerConfig({ name: `Player ${num}`, color })
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <OnlineContext.Provider value={{
      player: {
        config: playerConfig,
        setConfig: setPlayerConfig
      }
    }}>
      {children}
    </OnlineContext.Provider>
  );
}


export function useOnlineContext() {
  const context = useContext(OnlineContext);

  if (context === undefined) {
    throw new Error('OnlineContext must be used under an OnlineContextProvider');
  }

  return context;
}

export const OnlineContextConsumer = OnlineContext.Consumer;
