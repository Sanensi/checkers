import { useEffect } from "react";
import { useRef } from "react"
import { Application } from "../../app/Application";
import { Game as G } from "../../app/game/Game";

export function Game() {
  const c = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const g = G.initialize("blue", "red");
    const app = new Application(g, c.current);
    app.init();
  }, [])

  return (
    <canvas
      style={{
        width: "100%",
        height: "100%"
      }}
      ref={c}
    >
    </canvas>
  )
}