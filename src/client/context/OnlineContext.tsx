import React, { useContext, useState } from "react";
import { PlayerConfig, randomPlayerConfig } from "../../app/game/GameData";
import { Lobby } from "../../app/network/OnlineData";
import { useOnlineEvents } from "./network/useOnlineEvents";

interface OnlineState {
  actions: { };

  player: {
    config: PlayerConfig;
    setConfig: (config: PlayerConfig) => void;
  };

  lobby: Lobby;
}

const defaultLobby: Lobby = {
  numberOfPlayersInMatchmaking: 0,
  rooms: []
};

const OnlineContext = React.createContext<OnlineState>(undefined);

export const OnlineContextProvider: React.FC = ({ children }) => {
  const [playerConfig, setPlayerConfig] = useState(randomPlayerConfig());
  const [lobby, setLobby] = useState<Lobby>(defaultLobby);

  const actions = useOnlineEvents({
    'lobby-updated': (lobby) => {
      console.log(lobby);
      setLobby(lobby);
    }
  });

  return (
    <OnlineContext.Provider value={{
      actions: { },

      player: {
        config: playerConfig,
        setConfig: setPlayerConfig
      },

      lobby,
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
