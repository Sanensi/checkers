import { Vec2 } from "../utils/Vec2";
import { Player } from "./Player";


export class Token {
    constructor(
        public position: Vec2,
        readonly owner: Player,
        public promoted = false
    ) { }
}
