import { Board } from "./game/Board";
import { BoardDrawer } from "./Display";
import { ApplicationBase } from "./utils/ApplicationBase";
import { Vec2 } from "./utils/Vec2";
import { Game } from "./game/Game";

const game = Game.initialize("blue", "red");
game.currentPlayer = game.player1;

export class Application extends ApplicationBase {
    display: BoardDrawer;

    start() {
        this.display = new BoardDrawer(Board.size, this.ctx);
        this.canvas.addEventListener("mouseup", this.mouseup);
    }

    draw() {
        this.clear();
        this.display.drawBoard();
        game.player1.tokens.forEach(t => this.display.drawCircle(t.position, game.player1.color));
        game.player2.tokens.forEach(t => this.display.drawCircle(t.position, game.player2.color));
        game.player1.tokens.filter(t => t.promoted).forEach(t => this.display.drawCrown(t.position));
        game.player2.tokens.filter(t => t.promoted).forEach(t => this.display.drawCrown(t.position));
        game.capturableTokens.forEach(t => this.display.highlightSquare(t.position));
        game.selectedTokenMoves.forEach(m => this.display.drawCircle(m, game.currentPlayer.color, 0.1));

        if (game.selectedToken !== undefined) {
            this.display.drawCircle(game.selectedToken.position, "", 0, "lime", 3);
        }
    }

    resize(w: number, h: number) {
        this.display.resizeAndRecenter(w, h);
    }

    mouseup = (e: MouseEvent) => {
        const p = this.display.pixelToBoardCoordinates(new Vec2(e.clientX, e.clientY));
        game.click(p);
    }
}