import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { defaultGameConfig } from "../../app/game/GameData";
import { Game } from "./Game";
import { MenuBox, PlayerConfiguration } from "./Menus";
import { Lobby } from "./Lobby/Lobby"
import { useRoot } from "../hooks/useNavigation";
import { OnlineContextConsumer, OnlineContextProvider, useOnlineContext } from "../context/OnlineContext";

export function Online() {
  const { online } = useRoot();

  return (
    <OnlineContextProvider>
      <Switch>
        <Route exact path={online.PATH}>
          <OnlineOptions />
        </Route>
        <Route path={online.lobby.PATH}>
          <Lobby />
        </Route>
        <Route path={online.game.PATH}>
          <OnlineContextConsumer>
            {({ player }) => (
              <Game
                gameConfig={{
                  ...defaultGameConfig,
                  player1: player.config
                }}
              />
            )}
          </OnlineContextConsumer>
        </Route>
      </Switch>
    </OnlineContextProvider>
  )
}

function OnlineOptions() {
  const root = useRoot();
  const { player, actions: { } } = useOnlineContext();

  return (
    <MenuBox title="Online Game">
      <div className="has-text-left">
        <PlayerConfiguration
          label="Display Name and Color"
          player={player.config}
          onChange={player.setConfig}
        />

        <div className="buttons is-centered">
          <Link onClick={() => console.log('player-joined')} to={root.online.lobby.PATH} className="button is-primary">Start</Link>
          <Link to={root.PATH} className="button">Back</Link>
        </div>
      </div>
    </MenuBox>
  )
}