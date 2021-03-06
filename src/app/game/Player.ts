import { Token } from "./Token";


export enum Direction { up = -1, down = 1 }

export class Player {
    constructor(
        public name: string,
        public color: string,
        public direction: Direction,
        public tokens: Token[] = []
    ) { }
}
