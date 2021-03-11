import React, { useEffect, useReducer, useState, useRef } from "react";
import { faCircle as fasCircle, faCog } from "@fortawesome/free-solid-svg-icons";
import { faCircle as farCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Application } from "../../app/Application";
import { GameConfig, Player, PlayerConfig } from "../../app/game/GameData";
import { createGame } from "../../app/game/GameFactory";
import { MenuBox } from "./Menus";
import { useHistory } from "react-router";

interface Props {
  gameConfig: GameConfig;
}

export function Game({ gameConfig }: Props) {
  const history = useHistory();
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  const canvasRef = useRef<HTMLCanvasElement>();
  const game = useRef(createGame(gameConfig)).current;

  const isCurrentPlayer = (player: Player) => player === game.currentPlayer;
  const tokenCaptured = (player: Player) => 12 - player.tokens.length;

  useEffect(() => {
    game.addGameUpdateListener(forceUpdate);

    const app = new Application(game, canvasRef.current);
    app.init();
  }, [])

  const [info, setInfo] = useState(`${gameConfig.player1.name} is starting!`);

  return <>
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <PlayerDisplay
        name={game.player2.name}
        color={game.player2.color}
        isCurrentPlayer={isCurrentPlayer(game.player2)}
        numberCaptured={tokenCaptured(game.player1)}
      />
      <canvas
        style={{
          width: "100%",
          height: 0,
          flexBasis: "auto",
          flexGrow: 1
        }}
        ref={canvasRef}
      />
      <PlayerDisplay
        name={game.player1.name}
        color={game.player1.color}
        isCurrentPlayer={isCurrentPlayer(game.player1)}
        numberCaptured={tokenCaptured(game.player2)}
      />
    </div>

    <GameMenu
      onQuit={() => history.push("/")}
    />

    {info && <InformationDisplay
      info={info}
      onClick={() => setInfo(undefined)}
    />}
  </>
}

interface PlayerDisplayProps extends PlayerConfig {
  numberCaptured: number;
  isCurrentPlayer: boolean;
}

function PlayerDisplay({ name, color, isCurrentPlayer, numberCaptured }: PlayerDisplayProps) {
  return (
    <div
      style={{
        flexShrink: 1,
      }}
    >
      <p className="is-size-3 my-5">
        {name}
        <FontAwesomeIcon
          className="mx-3"
          color={color}
          icon={isCurrentPlayer ? fasCircle : farCircle}
          size="sm"
        />
        {numberCaptured}
      </p>
    </div>
  )
}

function GameMenu({ onQuit }: {
  onQuit: () => void
}) {
  const [isActive, setIsActive] = useState(false);

  const isActiveClass = isActive ? "is-active" : "";

  if (isActive) {
    return <div className={"modal " + isActiveClass}>
      <div className="modal-background" onClick={() => setIsActive(false)} />
      <MenuBox title="Options" style={{ width: "100%" }}>
        <div>
          <div className="control block">
            <button
              className="button is-fullwidth"
              onClick={() => setIsActive(false)}
            >
              Resume
          </button>
          </div>
          <div className="control block">
            <button
              className="button is-fullwidth"
              onClick={onQuit}
            >
              Quit
          </button>
          </div>
        </div>
      </MenuBox>
    </div>
  }

  return <button
    style={{
      position: "fixed",
      top: 0,
      right: 0,
    }}
    className="icon button is-rounded m-5 p-4"
    onClick={() => setIsActive(true)}
  >
    <FontAwesomeIcon
      icon={faCog}
      size="lg"
    />
  </button>
}

function InformationDisplay({ info, onClick }: {
  info: string,
  onClick: () => void
}) {
  return <div className="modal is-active">
    <div className="modal-background" onClick={onClick} />
    <MenuBox
      title={info}
      style={{width: "100%"}}
    />
  </div>
}
