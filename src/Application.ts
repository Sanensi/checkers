import { BoardDrawer } from "./Display";
import { ApplicationBase } from "./utils/ApplicationBase";
import { Vec2 } from "./utils/Vec2";

const BOARD_SIZE = new Vec2(8, 8);

enum Direction { up, down }

export class Token {
    constructor(
        public position: Vec2
    ) {}
}

class Player {
    constructor(
        public direction: Direction,
        public color: string,
        public tokens: Token[] = []
    ) {}
}

const { bot: player1, top: player2, board } = createTokens("blue", "red");
let currentPlayer = player1;
let selectedToken: Token;

export class Application extends ApplicationBase {
    display: BoardDrawer;

    start() {
        this.display = new BoardDrawer(BOARD_SIZE, this.ctx);
        this.canvas.addEventListener("mouseup", this.mouseup);
    }

    draw() {
        this.clear();
        this.display.drawBoard();
        player1.tokens.forEach(t => this.display.drawToken(t.position, player1.color));
        player2.tokens.forEach(t => this.display.drawToken(t.position, player2.color));

        if (selectedToken !== undefined) {
            this.display.drawToken(selectedToken.position, "", 0, "lime", 3);
        }
    }

    resize(w: number, h: number) {
        this.display.resizeAndRecenter(w, h);
    }

    mouseup = (e: MouseEvent) => {
        const p = this.display.pixelToBoardCoordinates(new Vec2(e.clientX, e.clientY));
        selectedToken = currentPlayer.tokens.find(t => t.position.equals(p));
    }
}

function createTokens(bottomColor: string, topColor: string) {
    const bottomPlayer = new Player(Direction.down, bottomColor);
    const topPlayer = new Player(Direction.down, topColor);
    const board: Token[] = [];

    for (let y = 0; y < BOARD_SIZE.y; y++) {
        for (let x = 0; x < BOARD_SIZE.x; x++) {
            if ((x+y) % 2 === 1) {
                if (y < 3) {
                    const t = new Token(new Vec2(x, y));
                    topPlayer.tokens.push(t);
                    board[boardIndex(x, y)] = t;
                }
                else if (y > 4) {
                    const t = new Token(new Vec2(x, y));
                    bottomPlayer.tokens.push(t);
                    board[boardIndex(x, y)] = t;
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

function boardIndex(x: number, y: number) {
    return y*BOARD_SIZE.x + x;
}