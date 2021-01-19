import { Board } from "./Board";
import { Token } from "./Token";
import { Vec2 } from "../utils/Vec2";
import { Direction, Player } from "./Player";

export class Game {
    public currentPlayer: Player;
    public selectedToken: Token;
    public selectedTokenMoves: Vec2[] = [];
    public capturableTokens: Token[] = [];

    constructor(
        readonly player1: Player,
        readonly player2: Player,
        readonly board: Board
    ) { }

    public moveToken(t: Token, to: Vec2) {
        if (this.board.isEmpty(to.x, to.y)) {
            this.board.set(t.position.x, t.position.y, undefined);
            this.board.set(to.x, to.y, t);
            t.position = to;
        }
    }

    public getMovementBase(t: Token, dir: Direction) {
        if (t === undefined)
            return [];

        const moves: Vec2[] = [
            t.position.add(new Vec2(-1, dir)),
            t.position.add(new Vec2(1, dir))
        ];

        if (t.promoted) {
            moves.push(
                t.position.add(new Vec2(-1, -dir)),
                t.position.add(new Vec2(1, -dir))
            );
        }

        return moves.filter(p => this.board.inside(p.x, p.y));
    }

    private getCapturableTokens(token: Token, dir: Direction) {
        return this.getMovementBase(token, dir)
            .map(m => this.board.get(m.x, m.y))
            .filter(t => t !== undefined)
            .filter(t => {
                const nso = this.nextSquareOver(token.position, t.position);
                return t.owner !== token.owner && this.board.isEmpty(nso.x, nso.y);
            });
    }

    private nextSquareOver(a: Vec2, b: Vec2) {
        if (!b.substract(a).map(Math.abs).equals(new Vec2(1, 1))) {
            throw new Error("a and b must be diagonally adjacent");
        }

        return b.scale(2).substract(a);
    }

    public swapPlayer() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        }
        else {
            this.currentPlayer = this.player1;
        }
    }

    static initialize(bottomColor: string, topColor: string) {
        const bottomPlayer = new Player(Direction.up, bottomColor);
        const topPlayer = new Player(Direction.down, topColor);
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

        return new Game(bottomPlayer, topPlayer, board);
    }
}
