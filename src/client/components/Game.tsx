import { faCircle as fasCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as farCircle } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useReducer, useState } from "react";
import { useRef } from "react"
import { Application } from "../../app/Application";
import { GameConfig, Player, PlayerConfig } from "../../app/game/GameData";
import { createGame } from "../../app/game/GameFactory";

interface Props {
  gameConfig: GameConfig;
}

export function Game({ gameConfig }: Props) {
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

  return (
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
  )
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
