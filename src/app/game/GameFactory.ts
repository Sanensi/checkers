import { Vec2 } from "../utils/Vec2";
import { Board } from "./Board";
import { Game } from "./Game";
import { Direction, Player, Token } from "./GameData";

function createGame(bottomColor: string, topColor: string) {
  const bottomPlayer: Player = { name: "Player 1", color: bottomColor, direction: Direction.up, tokens: [] };
  const topPlayer: Player = { name: "Player 2", color: topColor, direction: Direction.down, tokens: [] };
  const board = new Board();

  for (let y = 0; y < Board.size.y; y++) {
    for (let x = 0; x < Board.size.x; x++) {
      if ((x + y) % 2 === 1) {
        if (y < 3) {
          const t = createToken(new Vec2(x, y), topPlayer);
          topPlayer.tokens.push(t);
          board.set(x, y, t);
        }
        else if (y > 4) {
          const t = createToken(new Vec2(x, y), bottomPlayer);
          bottomPlayer.tokens.push(t);
          board.set(x, y, t);
        }
      }
    }
  }

  return new Game(bottomPlayer, topPlayer, board, bottomPlayer);
}

function createToken(position: Vec2, owner: Player): Token {
  return {
    position,
    owner,
    promoted: false
  }
}

export {
  createGame
}
