import React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { defaultGameConfig } from "../../app/game/GameData";
import { Game } from "./Game";
import { MenuBox, PlayerConfiguration } from "./Menus";
import { Lobby } from "./Lobby/Lobby"
import { useRoot } from "../hooks/useNavigation";
import { LobbyContextConsumer, LobbyContextProvider, useLobbyContext } from "../context/LobbyContext";

export function Online() {
  const { online } = useRoot();

  return (
    <LobbyContextProvider>
      <Switch>
        <Route exact path={online.PATH}>
          <OnlineOptions />
        </Route>
        <Route path={online.lobby.PATH}>
          <Lobby />
        </Route>,
        <Route exact path={online.game.PATH}>
          <LobbyContextConsumer>
            {({ player }) => (
              <Game
                gameConfig={{
                  ...defaultGameConfig,
                  player1: player.config
                }}
              />
            )}
          </LobbyContextConsumer>
        </Route>
        <Redirect to={online.PATH} />
      </Switch>
    </LobbyContextProvider>
  )
}

function OnlineOptions() {
  const root = useRoot();
  const { player, actions: { joinLobby } } = useLobbyContext();

  return (
    <MenuBox title="Online Game">
      <div className="has-text-left">
        <PlayerConfiguration
          label="Display Name and Color"
          player={player.config}
          onChange={player.setConfig}
        />

        <div className="buttons is-centered">
          <Link onClick={() => joinLobby(player.config)} to={root.online.lobby.PATH} className="button is-primary">Start</Link>
          <Link to={root.PATH} className="button">Back</Link>
        </div>
      </div>
    </MenuBox>
  )
}