import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { defaultGameConfig } from "../../app/game/GameData";
import { Game } from "./Game";
import { MenuBox, PlayerConfiguration } from "./Menus";

export function Online() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <OnlineOptions />
      </Route>
      <Route exact path={`${path}/game`}>
        <Game
          gameConfig={defaultGameConfig}
        />
      </Route>
    </Switch>
  )
}

function OnlineOptions() {
  const { url } = useRouteMatch();

  return (
    <MenuBox>
      <div className="has-text-left">
        <PlayerConfiguration
          label="Display Name and Color"
          player={defaultGameConfig.player1}
          onChange={() => {}}
        />

        <div className="buttons is-centered">
          <Link to={`${url}/game`} className="button is-primary">Start</Link>
          <Link to="/" className="button">Back</Link>
        </div>
      </div>
    </MenuBox>
  )
}