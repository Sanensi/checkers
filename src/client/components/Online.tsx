import React, { useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { defaultGameConfig, PlayerConfig } from "../../app/game/GameData";
import { Game } from "./Game";
import { MenuBox, PlayerConfiguration } from "./Menus";
import { Lobby } from "./Lobby"

export function Online() {
  const { path } = useRouteMatch();
  const [playerConfig, setPlayerConfig] = useState(defaultGameConfig.player1)

  return (
    <Switch>
      <Route exact path={path}>
        <OnlineOptions
          playerConfig={playerConfig}
          onPlayerConfigUpdate={setPlayerConfig}
        />
      </Route>
      <Route path={`${path}/lobby`}>
        <Lobby
          player={playerConfig}
        />
      </Route>
      <Route path={`${path}/game`}>
        <Game
          gameConfig={{
            ...defaultGameConfig,
            player1: playerConfig
          }}
        />
      </Route>
    </Switch>
  )
}

interface Props  {
  playerConfig: PlayerConfig;
  onPlayerConfigUpdate: React.Dispatch<React.SetStateAction<PlayerConfig>>;
}

function OnlineOptions({ playerConfig, onPlayerConfigUpdate }: Props) {
  const { url } = useRouteMatch();

  return (
    <MenuBox title="Online Game">
      <div className="has-text-left">
        <PlayerConfiguration
          label="Display Name and Color"
          player={playerConfig}
          onChange={onPlayerConfigUpdate}
        />

        <div className="buttons is-centered">
          <Link to={`${url}/lobby`} className="button is-primary">Start</Link>
          <Link to="/" className="button">Back</Link>
        </div>
      </div>
    </MenuBox>
  )
}