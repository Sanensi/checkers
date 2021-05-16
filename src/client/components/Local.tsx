import { Link, Switch, Route, Redirect } from "react-router-dom";
import React, { useState } from "react";

import { defaultGameConfig, GameConfig } from "../../app/game/GameData";
import { MenuBox, PlayerConfiguration } from "./Menus";
import { Game } from "./Game";
import { useRoot } from "../hooks/useNavigation";

export function Local() {
  const { local } = useRoot();
  const [gameConfig, setGameConfig] = useState(defaultGameConfig);

  return (
    <Switch>
      <Route exact path={local.PATH}>
        <LocalOptions
          gameConfig={gameConfig}
          onGameConfigUpdate={setGameConfig}
        />
      </Route>
      <Route exact path={local.game.PATH}>
        <Game
          gameConfig={gameConfig}
        />
      </Route>
      <Redirect to={local.PATH} />
    </Switch>
  )
}

interface Props {
  gameConfig: GameConfig;
  onGameConfigUpdate: React.Dispatch<React.SetStateAction<GameConfig>>;
}

function LocalOptions({ gameConfig, onGameConfigUpdate }: Props) {
  const root = useRoot();

  return (
    <MenuBox title="Local Game">
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
          <Link to={root.local.game.PATH} className="button is-primary">Start</Link>
          <Link to={root.PATH} className="button">Back</Link>
        </div>
      </div>
    </MenuBox>
  )
}