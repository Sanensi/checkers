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
    ) {
        this.currentPlayer = player1;
    }

    public click(p: Vec2) {
        if (!this.selectedTokenMoves.some(m => m.equals(p))) {
            this.selectToken(p);
        }
        else if (this.capturableTokens.length === 0) {
            this.moveToken(this.selectedToken, p);
        }
        else {
            this.captureToken(this.selectedToken, p);
        }
    }

    private selectToken(p: Vec2) {
        this.selectedToken = this.currentPlayer.tokens.find(t => t.position.equals(p));

        if (this.capturableTokens.length !== 0) {
            const capturables = this.getCapturableTokens(this.selectedToken, this.currentPlayer.direction)
                .filter(t => this.capturableTokens.includes(t));

            this.selectedTokenMoves = capturables.map(t => this.nextSquareOver(this.selectedToken.position, t.position));
        }
        else {
            this.selectedTokenMoves = this.getMovementBase(this.selectedToken, this.currentPlayer.direction)
                .filter(m => this.board.isEmpty(m.x, m.y));
        }
    }

    private moveToken(t: Token, to: Vec2) {
        this.board.set(t.position.x, t.position.y, undefined);
        this.board.set(to.x, to.y, t);
        t.position = to;
        this.promote(t);

        this.swapPlayer();
    }

    private captureToken(t: Token, to: Vec2) {
        const sib = this.squareInBetween(t.position, to);
        const capturedToken = this.board.get(sib.x, sib.y);
        const other = this.getOppositePlayer();

        other.tokens = other.tokens.filter(t => t !== capturedToken);
        this.board.set(sib.x, sib.y, undefined);

        this.board.set(t.position.x, t.position.y, undefined);
        this.board.set(to.x, to.y, t);
        t.position = to;
        this.promote(t);

        this.capturableTokens = this.getCapturableTokens(t, this.currentPlayer.direction);
        this.selectedTokenMoves = this.capturableTokens.map(t => this.nextSquareOver(this.selectedToken.position, t.position));

        if (this.capturableTokens.length === 0) {
            this.swapPlayer();
        } 
    }

    private promote(t: Token) {
        if ((this.currentPlayer.direction === Direction.up && t.position.y === 0)
         || (this.currentPlayer.direction === Direction.down && t.position.y === 7)) {
            t.promoted = true;
        }
    }

    private getMovementBase(t: Token, dir: Direction) {
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

    private squareInBetween(a: Vec2, b: Vec2) {
        if (!b.substract(a).map(Math.abs).equals(new Vec2(2, 2))) {
            throw new Error("a and b must be one square appart diagonally");
        }

        return b.add(a).scale(0.5);
    }

    private swapPlayer() {
        this.currentPlayer = this.getOppositePlayer();
        this.selectedToken = undefined;
        this.selectedTokenMoves = [];
        this.capturableTokens = this.currentPlayer.tokens
            .reduce((acc, t) => [...acc, ...this.getCapturableTokens(t, this.currentPlayer.direction)], new Array<Token>());
    }

    private getOppositePlayer() {
        if (this.currentPlayer === this.player1) {
            return this.player2;
        }
        else {
            return this.player1;
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
