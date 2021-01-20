import { Board } from "./game/Board";
import { BoardDrawer } from "./Display";
import { ApplicationBase } from "./utils/ApplicationBase";
import { Vec2 } from "./utils/Vec2";
import { Game } from "./game/Game";

export class Application extends ApplicationBase {
    private display: BoardDrawer;
    
    constructor(
        private game: Game,
        canvas: HTMLCanvasElement,
    ) {
        super(canvas);
    }

    protected start() {
        this.display = new BoardDrawer(Board.size, this.ctx);
        this.canvas.addEventListener("pointerup", this.pointerUp);
    }

    protected draw() {
        this.clear();
        this.display.drawBoard();
        this.game.player1.tokens.forEach(t => this.display.drawCircle(t.position, this.game.player1.color));
        this.game.player2.tokens.forEach(t => this.display.drawCircle(t.position, this.game.player2.color));
        this.game.player1.tokens.filter(t => t.promoted).forEach(t => this.display.drawCrown(t.position));
        this.game.player2.tokens.filter(t => t.promoted).forEach(t => this.display.drawCrown(t.position));
        this.game.capturableTokens.forEach(t => this.display.highlightSquare(t.position));
        this.game.selectedTokenMoves.forEach(m => this.display.drawCircle(m, this.game.currentPlayer.color, 0.1));

        if (this.game.selectedToken !== undefined) {
            this.display.drawCircle(this.game.selectedToken.position, "", 0, "lime", 3);
        }
    }

    protected resize(w: number, h: number) {
        this.display.resizeAndRecenter(w, h);
    }

    protected pointerUp = (e: PointerEvent) => {
        const p = this.display.pixelToBoardCoordinates(new Vec2(e.clientX, e.clientY));
        this.game.click(p);
    }
}