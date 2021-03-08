import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import React, { useState } from "react";

import { defaultGameConfig, GameConfig } from "../../app/game/GameData";
import { MenuBox, PlayerConfiguration } from "./Menus";
import { Game } from "./Game";

export function Local() {
  const { path } = useRouteMatch();
  const [gameConfig, setGameConfig] = useState(defaultGameConfig);

  return (
    <Switch>
      <Route exact path={path}>
        <LocalOptions
          gameConfig={gameConfig}
          onGameConfigUpdate={setGameConfig}
        />
      </Route>
      <Route path={`${path}/game`}>
        <Game
          gameConfig={gameConfig}
        />
      </Route>
    </Switch>
  )
}

function LocalOptions({ gameConfig, onGameConfigUpdate }: {
  gameConfig: GameConfig;
  onGameConfigUpdate: React.Dispatch<React.SetStateAction<GameConfig>>;
}) {
  const { url } = useRouteMatch();

  return (
    <MenuBox>
      <div className="has-text-left">
        <PlayerConfiguration
          label="Player 1"
          player={gameConfig.player1}
          onChange={p => onGameConfigUpdate(gc => ({...gc, player1: p}))}
        />

        <PlayerConfiguration
          label="Player 2"
          player={gameConfig.player2}
          onChange={p => onGameConfigUpdate(gc => ({...gc, player2: p}))}
        />

        <div className="buttons is-centered">
          <Link to={`${url}/game`} className="button is-primary">Start</Link>
          <Link to="/" className="button">Back</Link>
        </div>
      </div>
    </MenuBox>
  )
}