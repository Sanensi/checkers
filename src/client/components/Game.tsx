import { faCircle as fasCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as farCircle } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useRef } from "react"
import { Application } from "../../app/Application";
import { GameConfig, PlayerConfig } from "../../app/game/GameData";
import { createGame } from "../../app/game/GameFactory";

interface Props {
  gameConfig: GameConfig;
}

export function Game({ gameConfig }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const game = createGame(gameConfig);
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
        name={gameConfig.player2.name}
        color={gameConfig.player2.color}
        isCurrentPlayer={false}
        numberCaptured={0}
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
        name={gameConfig.player1.name}
        color={gameConfig.player1.color}
        isCurrentPlayer={true}
        numberCaptured={0}
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
        <FontAwesomeIcon
          className="mx-3"
          color={color}
          icon={isCurrentPlayer ? fasCircle : farCircle}
          size="sm"
        />
        {name}: {numberCaptured}
      </p>
    </div>
  )
}
