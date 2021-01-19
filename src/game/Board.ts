import { Vec2 } from "../utils/Vec2";
import { Token } from "./Token";


export class Board {
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
