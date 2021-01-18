import { ApplicationBase } from "./utils/ApplicationBase";
import { Vec2 } from "./utils/Vec2";

const BOARD_SIZE = new Vec2(8, 8);

let boardPosition = new Vec2(100, 100);
let boardScale = new Vec2(50, 50);

class Token {
    constructor(
        public color: string,
        public position: Vec2
    ) {}
}

const { bot: player1, top: player2 } = createTokens("blue", "red");

export class Application extends ApplicationBase {
    draw() {
        this.clear();
        this.drawBoard();
        player1.forEach(this.drawToken);
        player2.forEach(this.drawToken);
    }

    resize(w: number, h: number) {
        const proportion = BOARD_SIZE.x / BOARD_SIZE.y;
        const fillWidth = w/h < proportion;
    
        const width = fillWidth ? w : h*proportion;
        const height = !fillWidth ? h : w/proportion;
    
        boardScale = new Vec2(width/BOARD_SIZE.x, height/BOARD_SIZE.y);

        const x = fillWidth ? 0 : w/2 - width/2;
        const y = !fillWidth ? 0 : h/2 - height/2;

        boardPosition = new Vec2(x, y);
    }

    drawBoard() {
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "black";
        const fullSize = BOARD_SIZE.scale(boardScale);
        this.ctx.fillRect(boardPosition.x, boardPosition.y, fullSize.x, fullSize.y);
        this.ctx.strokeRect(boardPosition.x, boardPosition.y, fullSize.x, fullSize.y);

        this.ctx.fillStyle = "gray";
        for (let y = 0; y < BOARD_SIZE.y; y++) {
            for (let x = 0; x < BOARD_SIZE.x; x++) {                
                if (isBlackCase(x, y)) {
                    const offset = getTopLeftCorner(x, y);
                    this.ctx.fillRect(offset.x, offset.y, boardScale.x, boardScale.y);
                }
            }
        }
    }

    drawToken = (t: Token) => {
        const center = getCenter(t.position.x, t.position.y);
        const radius = boardScale.scale(0.4);

        this.ctx.fillStyle = t.color;
        this.ctx.strokeStyle = "black";

        this.ctx.beginPath();
        this.ctx.ellipse(center.x, center.y, radius.x, radius.y, 0, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }
}

function createTokens(bottomColor: string, topColor: string) {
    const topTokens: Token[] = [];
    const bottomTokens: Token[] = [];

    for (let y = 0; y < BOARD_SIZE.y; y++) {
        for (let x = 0; x < BOARD_SIZE.x; x++) {
            if (isBlackCase(x, y)) {
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

function isBlackCase(x: number, y: number) {
    return (x+y) % 2 === 1;
}

function getTopLeftCorner(x: number, y: number) {
    return boardPosition.add(new Vec2(x, y).scale(boardScale));
}

function getCenter(x: number, y: number) {
    return getTopLeftCorner(x, y).add(boardScale.scale(0.5));
}