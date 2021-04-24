import React, { useContext, useState } from "react";
import { PlayerConfig } from "../../app/game/GameData";
import { Lobby } from "../../app/network/OnlineData";
import { useOnlineEvents } from "./network/useOnlineEvents";

interface OnlineState {
  player: {
    config: PlayerConfig;
    setConfig: (config: PlayerConfig) => void;
  }
  actions: {
    createPlayer: () => void;
  };
}

const OnlineContext = React.createContext<OnlineState>(undefined);

export const OnlineContextProvider: React.FC = ({ children }) => {
  const [playerConfig, setPlayerConfig] = useState({ name: '', color: '#0000ff' });
  const [lobby, setLobby] = useState<Lobby>();

  const actions = useOnlineEvents({
    'player-init': (num, color) => {
      setPlayerConfig({ name: `Player ${num}`, color })
    },
    'lobby-joined': (lobby) => {
      console.log(lobby);
    }
  });

  return (
    <OnlineContext.Provider value={{
      player: {
        config: playerConfig,
        setConfig: setPlayerConfig
      },
      actions: {
        createPlayer: () => {
          actions.createPlayer(playerConfig);
        }
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
