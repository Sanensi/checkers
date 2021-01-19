import { Token } from "./Token";


export enum Direction { up = -1, down = 1 }

export class Player {
    constructor(
        public direction: Direction,
        public color: string,
        public tokens: Token[] = []
    ) { }
}
