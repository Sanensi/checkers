import { Vec2 } from "./utils/Vec2";

export class BoardDrawer {
    private boardPosition: Vec2;
    private boardScale: Vec2;

    constructor(
        private size: Vec2,
        private ctx: CanvasRenderingContext2D
    ) {}

    drawBoard() {
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        const fullSize = this.size.scale(this.boardScale);
        this.ctx.fillRect(this.boardPosition.x, this.boardPosition.y, fullSize.x, fullSize.y);
        this.ctx.strokeRect(this.boardPosition.x, this.boardPosition.y, fullSize.x, fullSize.y);

        this.ctx.fillStyle = "gray";
        for (let y = 0; y < this.size.y; y++) {
            for (let x = 0; x < this.size.x; x++) {                
                if ((x+y) % 2 === 1) {
                    const offset = this.getTopLeftCorner(x, y);
                    this.ctx.fillRect(offset.x, offset.y, this.boardScale.x, this.boardScale.y);
                }
            }
        }
    }

    highlightSquare(p: Vec2, stroke = "red", lineWidth = 3) {
        const offset = this.getTopLeftCorner(p.x, p.y);
        this.ctx.strokeStyle = stroke;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(offset.x, offset.y, this.boardScale.x, this.boardScale.y);
    }

    drawCircle(p: Vec2, fill: string, fillAlpha = 1, stroke = "black", lineWidth = 1, strokeAlpha = 1) {
        const center = this.getCenter(p.x, p.y);
        const radius = this.boardScale.scale(0.4);
    
        this.ctx.beginPath();
        this.ctx.ellipse(center.x, center.y, radius.x, radius.y, 0, 0, 2*Math.PI);
        this.ctx.fillStyle = fill;
        this.ctx.strokeStyle = stroke;
        this.ctx.lineWidth = lineWidth;
        this.ctx.globalAlpha = fillAlpha;
        this.ctx.fill();
        this.ctx.globalAlpha = strokeAlpha;
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
    }

    drawCrown(p: Vec2): void {
        const center = this.getCenter(p.x, p.y);
        const size = this.boardScale.scale(0.3).x;
        
        this.ctx.fillStyle = "white";
        this.ctx.font = `${size}px serif`;
        this.ctx.textAlign = "center"; 
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("👑", center.x, center.y);
    }

    resizeAndRecenter(w: number, h: number) {
        const proportion = this.size.x / this.size.y;
        const fillWidth = w/h < proportion;
    
        const width = fillWidth ? w : h*proportion;
        const height = !fillWidth ? h : w/proportion;
    
        this.boardScale = new Vec2(width/this.size.x, height/this.size.y);

        const x = fillWidth ? 0 : w/2 - width/2;
        const y = !fillWidth ? 0 : h/2 - height/2;

        this.boardPosition = new Vec2(x, y);
    }

    private getTopLeftCorner(x: number, y: number) {
        return this.boardPosition.add(new Vec2(x, y).scale(this.boardScale));
    }
    
    private getCenter(x: number, y: number) {
        return this.getTopLeftCorner(x, y).add(this.boardScale.scale(0.5));
    }

    pixelToBoardCoordinates(p: Vec2) {
        return p.substract(this.boardPosition).divide(this.boardScale).map(Math.floor);
    }
}