import { BoardDrawer } from "./Display";
import { ApplicationBase } from "./utils/ApplicationBase";
import { Vec2 } from "./utils/Vec2";

class Token {
    constructor(
        public position: Vec2,
        readonly owner: Player,
        public promoted = false
    ) { }
}

class Board {
    private tiles: Token[] = [];
    static readonly size = new Vec2(8, 8);

    get(x: number, y: number) {
        this.assertInside(x, y);
        return this.tiles[this.indexOf(x, y)];
    }

    set(x: number, y: number, t: Token) {
        this.assertInside(x, y);
        this.tiles[this.indexOf(x, y)] = t;
    }

    isReachable(x: number, y: number) {
        return this.inside(x, y) && this.get(x, y) === undefined;
    }

    inside(x: number, y: number) {
        return x >= 0 && x < Board.size.x && y >= 0 && y < Board.size.y;
    }

    private assertInside(x: number, y: number) {
        if (!this.inside(x, y)) {
            throw new Error(`x: ${x}, y: ${y} is not inside board of size ${Board.size.x}x${Board.size.y}`);
        }
    }

    private indexOf(x: number, y: number) {
        return y * Board.size.x + x;
    }
}

enum Direction { up = -1, down = 1 }

class Player {
    constructor(
        public direction: Direction,
        public color: string,
        public tokens: Token[] = []
    ) { }
}

const { bot: player1, top: player2, board } = initializeGame("blue", "red");
let currentPlayer = player1;
let selectedToken: Token;
let selectedTokenMoves: Vec2[] = [];
let capturableTokens: Token[] = [];

export class Application extends ApplicationBase {
    display: BoardDrawer;

    start() {
        this.display = new BoardDrawer(Board.size, this.ctx);
        this.canvas.addEventListener("mouseup", this.mouseup);
        capturableTokens = currentPlayer.tokens
            .reduce((acc, t) => [...acc, ...getCapturableTokens(t, board, currentPlayer.direction)], new Array<Token>());
    }

    draw() {
        this.clear();
        this.display.drawBoard();
        player1.tokens.forEach(t => this.display.drawToken(t.position, player1.color));
        player2.tokens.forEach(t => this.display.drawToken(t.position, player2.color));

        if (selectedToken !== undefined) {
            this.display.drawToken(selectedToken.position, "", 0, "lime", 3);
            selectedTokenMoves.forEach(m => this.display.drawToken(m, currentPlayer.color, 0.1));
        }
    }

    resize(w: number, h: number) {
        this.display.resizeAndRecenter(w, h);
    }

    mouseup = (e: MouseEvent) => {
        const p = this.display.pixelToBoardCoordinates(new Vec2(e.clientX, e.clientY));

        if (selectedTokenMoves.some(m => m.equals(p))) {
            moveToken(selectedToken, p, board);
            swapPlayer();
            selectedToken = undefined;
            selectedTokenMoves = [];
            capturableTokens = currentPlayer.tokens
                .reduce((acc, t) => [...acc, ...getCapturableTokens(t, board, currentPlayer.direction)], new Array<Token>());
        }
        else {
            selectedToken = currentPlayer.tokens.find(t => t.position.equals(p));
            selectedTokenMoves = getMovementBase(selectedToken, board, currentPlayer.direction);
        }
    }
}

function initializeGame(bottomColor: string, topColor: string) {
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
                    board.set(x, y, t)
                }
            }
        }
    }

    return {
        top: topPlayer,
        bot: bottomPlayer,
        board
    }
}

function getMovementBase(t: Token, b: Board, dir: Direction) {
    if (t === undefined) return [];

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

    return moves.filter(p => b.inside(p.x, p.y));
}

function getCapturableTokens(token: Token, b: Board, dir: Direction) {
    return getMovementBase(token, b, dir)
        .map(m => b.get(m.x, m.y))
        .filter(t => t !== undefined)
        .filter(t => {
            const nso = nextSquareOver(token.position, t.position);
            return t.owner !== token.owner && b.isReachable(nso.x, nso.y);
        });
}

function nextSquareOver(a: Vec2, b: Vec2) {
    if (!b.substract(a).map(Math.abs).equals(new Vec2(1, 1))) {
        throw new Error("a and b must be diagonally adjacent");
    }

    return b.scale(2).substract(a);
}

function moveToken(t: Token, to: Vec2, b: Board) {
    board.set(t.position.x, t.position.y, undefined);
    board.set(to.x, to.y, t);
    t.position = to;
}

function swapPlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
    }
    else {
        currentPlayer = player1;
    }
}