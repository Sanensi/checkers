import { Vec2 } from "../utils/Vec2";
import { Board } from "./Board";
import { Game } from "./Game";
import { Player, Direction } from "./Player";
import { Token } from "./Token";

function createGame(bottomColor: string, topColor: string) {
  const bottomPlayer = new Player("Player 1", bottomColor,  Direction.up);
  const topPlayer = new Player("Player 2", topColor,  Direction.down);
  const board = new Board();

  for (let y = 0; y < Board.size.y; y++) {
    for (let x = 0; x < Board.size.x; x++) {
      if ((x + y) % 2 === 1) {
        if (y < 3) {
          const t = new Token(new Vec2(x, y), topPlayer);
          topPlayer.tokens.push(t);
          board.set(x, y, t);
        }
        else if (y > 4) {
          const t = new Token(new Vec2(x, y), bottomPlayer);
          bottomPlayer.tokens.push(t);
          board.set(x, y, t);
        }
      }
    }
  }

  return new Game(bottomPlayer, topPlayer, board, bottomPlayer);
}

export {
  createGame
}
