import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import React, { useState } from "react";

import { defaultGameConfig, GameConfig } from "../../app/game/GameData";
import { MenuBox } from "./Menus";
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

interface Props {
  gameConfig: GameConfig;
  onGameConfigUpdate: React.Dispatch<React.SetStateAction<GameConfig>>;
}

function LocalOptions({ gameConfig, onGameConfigUpdate }: Props) {
  const { url } = useRouteMatch();

  return (
    <MenuBox>
      <div className="has-text-left">
        <label className="label">Player 1</label>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={gameConfig.player1.name}
              onChange={e => onGameConfigUpdate(gc => ({
                ...gc,
                player1: { ...gc.player1, name: e.target.value }
              }))}
            />
          </p>
          <p className="control">
            <input
              className="input color"
              type="color"
              value={gameConfig.player1.color}
              onChange={e => onGameConfigUpdate(gc => ({
                ...gc,
                player1: { ...gc.player1, color: e.target.value }
              }))}
            />
          </p>
        </div>

        <label className="label">Player 2</label>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={gameConfig.player2.name}
              onChange={e => onGameConfigUpdate(gc => ({
                ...gc,
                player2: { ...gc.player2, name: e.target.value }
              }))}
            />
          </p>
          <p className="control">
            <input
              className="input color"
              type="color"
              value={gameConfig.player2.color}
              onChange={e => onGameConfigUpdate(gc => ({
                ...gc,
                player2: { ...gc.player2, color: e.target.value }
              }))}
            />
          </p>
        </div>

        <div className="buttons is-centered">
          <Link to={`${url}/game`} className="button is-primary">Start</Link>
          <Link to="/" className="button">Back</Link>
        </div>
      </div>
    </MenuBox>
  )
}