import { useEffect } from "react";
import { useRef } from "react"
import { Application } from "../../app/Application";
import { createGame } from "../../app/game/GameFactory";

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const game = createGame("blue", "red");
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