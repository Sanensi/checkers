import React, { useContext, useState } from "react";
import { PlayerConfig, randomPlayerConfig } from "../../app/game/GameData";
import { Lobby } from "../../app/network/LobbyData";
import { useLobbyEvents } from "./network/useLobbyEvents";

interface LobbyState {
  actions: { };

  player: {
    config: PlayerConfig;
    setConfig: (config: PlayerConfig) => void;
  };

  lobby: Lobby;
}

const defaultLobby: Lobby = {
  numberOfPlayersOnline: 0,
  rooms: []
};

const LobbyContext = React.createContext<LobbyState>(undefined);

export const LobbyContextProvider: React.FC = ({ children }) => {
  const [playerConfig, setPlayerConfig] = useState(randomPlayerConfig);
  const [lobby, setLobby] = useState<Lobby>(defaultLobby);

  const actions = useLobbyEvents({
    'lobby-updated': (lobby) => {
      console.log(lobby);
      setLobby(lobby);
    }
  });

  return (
    <LobbyContext.Provider value={{
      actions: { },

      player: {
        config: playerConfig,
        setConfig: setPlayerConfig
      },

      lobby,
    }}>
      {children}
    </LobbyContext.Provider>
  );
}


export function useLobbyContext() {
  const context = useContext(LobbyContext);

  if (context === undefined) {
    throw new Error('OnlineContext must be used under an OnlineContextProvider');
  }

  return context;
}

export const LobbyContextConsumer = LobbyContext.Consumer;
