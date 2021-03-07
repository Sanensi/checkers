import { useEffect } from "react";
import { useRef } from "react"
import { Application } from "../../app/Application";
import { GameConfig } from "../../app/game/GameData";
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
    <canvas
      style={{
        width: "100%",
        height: "100%"
      }}
      ref={canvasRef}
    >
    </canvas>
  )
}