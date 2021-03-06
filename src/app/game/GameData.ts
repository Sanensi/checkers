import { Vec2 } from "../utils/Vec2";

export enum Direction { up = -1, down = 1 }

export type Token = {
  position: Vec2;
  promoted: boolean;
  readonly owner: Player;
}

export type Player = {
  readonly name: string;
  readonly color: string;
  readonly direction: Direction;
  tokens: Token[];
}

type PlayerConfig = Omit<Player, "direction" | "tokens">;

export enum StartingPlayer { P1, P2, Random }

export type GameConfig = Readonly<{
  player1: PlayerConfig;
  player2: PlayerConfig;
  startingPlayer: StartingPlayer;
}>

export const defaultGameConfig: GameConfig = {
  player1: { name: "Player 1", color: "#0000ff" },
  player2: { name: "Player 2", color: "#ff0000" },
  startingPlayer: StartingPlayer.P1
}
