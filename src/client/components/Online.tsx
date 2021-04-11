import React, { useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { defaultGameConfig, PlayerConfig } from "../../app/game/GameData";
import { Game } from "./Game";
import { MenuBox, PlayerConfiguration } from "./Menus";
import { Lobby } from "./Lobby/Lobby"
import { useRoot } from "../hooks/useNavigation";

export function Online() {
  const { online } = useRoot();
  const [playerConfig, setPlayerConfig] = useState(defaultGameConfig.player1)

  return (
    <Switch>
      <Route exact path={online.PATH}>
        <OnlineOptions
          playerConfig={playerConfig}
          onPlayerConfigUpdate={setPlayerConfig}
        />
      </Route>
      <Route path={online.lobby.PATH}>
        <Lobby
          player={playerConfig}
        />
      </Route>
      <Route path={online.game.PATH}>
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
  const root = useRoot();

  return (
    <MenuBox title="Online Game">
      <div className="has-text-left">
        <PlayerConfiguration
          label="Display Name and Color"
          player={playerConfig}
          onChange={onPlayerConfigUpdate}
        />

        <div className="buttons is-centered">
          <Link to={root.online.lobby.PATH} className="button is-primary">Start</Link>
          <Link to={root.PATH} className="button">Back</Link>
        </div>
      </div>
    </MenuBox>
  )
}