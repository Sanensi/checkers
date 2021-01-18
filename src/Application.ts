import { ApplicationBase } from "./utils/ApplicationBase";
import { Vec2 } from "./utils/Vec2";

const BOARD_SIZE = new Vec2(8, 8);

let boardPosition = new Vec2(100, 100);
let boardScale = new Vec2(50, 50);



export class Application extends ApplicationBase {
    draw() {
        this.clear();

        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "black";
        const fullSize = BOARD_SIZE.scale(boardScale);
        this.ctx.fillRect(boardPosition.x, boardPosition.y, fullSize.x, fullSize.y);
        this.ctx.strokeRect(boardPosition.x, boardPosition.y, fullSize.x, fullSize.y);

        this.ctx.fillStyle = "gray";
        for (let y = 0; y < BOARD_SIZE.y; y++) {
            for (let x = 0; x < BOARD_SIZE.x; x++) {                
                if ((x+y) % 2 === 1) {
                    const offset = boardPosition.add(new Vec2(x, y).scale(boardScale));
                    this.ctx.fillRect(offset.x, offset.y, boardScale.x, boardScale.y);
                }
            }
        }
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
}