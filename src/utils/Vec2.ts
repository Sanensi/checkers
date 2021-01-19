
export class Vec2 {
    constructor(readonly x: number, readonly y: number) { }

    public add(v: Vec2) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    public substract(v: Vec2) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    public scale(s: number | Vec2) {
        if (s instanceof Vec2) {
            return new Vec2(this.x * s.x, this.y * s.y);
        }
        else {
            return new Vec2(this.x * s, this.y * s);
        }
    }

    public divide(s: number | Vec2) {
        if (s instanceof Vec2) {
            return new Vec2(this.x / s.x, this.y / s.y);
        }
        else {
            return new Vec2(this.x / s, this.y / s);
        }
    }

    public map(f: (a: number) => number) {
        return new Vec2(f(this.x), f(this.y));
    }

    equals(o: Vec2) {
        if (o === undefined) return false;

        return this.x === o.x && this.y === o.y;
    }
}
