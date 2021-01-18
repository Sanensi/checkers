import { Display } from "./Display";
import { ApplicationBase } from "./utils/ApplicationBase";
import { Vec2 } from "./utils/Vec2";

const BOARD_SIZE = new Vec2(8, 8);

export class Token {
    constructor(
        public color: string,
        public position: Vec2
    ) {}
}

let currentPlayer = 0;
const { bot: player1, top: player2 } = createTokens("blue", "red");

export class Application extends ApplicationBase {
    display: Display;

    start() {
        this.display = new Display(BOARD_SIZE, this.ctx);
    }

    draw() {
        this.clear();
        this.display.drawBoard();
        player1.forEach(this.display.drawToken);
        player2.forEach(this.display.drawToken);
    }

    resize(w: number, h: number) {
        this.display.resizeAndRecenter(w, h);
    }
}

function createTokens(bottomColor: string, topColor: string) {
    const topTokens: Token[] = [];
    const bottomTokens: Token[] = [];

    for (let y = 0; y < BOARD_SIZE.y; y++) {
        for (let x = 0; x < BOARD_SIZE.x; x++) {
            if ((x+y) % 2 === 1) {
                if (y < 3) {
                    topTokens.push(new Token(topColor, new Vec2(x, y)));
                }
                else if (y > 4) {
                    bottomTokens.push(new Token(bottomColor, new Vec2(x, y)));
                }
            }
        }
    }

    return {
        top: topTokens,
        bot: bottomTokens
    }
}