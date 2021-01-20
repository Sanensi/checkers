import "index.css";

import { Application } from "../app/Application";
import { Game } from "../app/game/Game";

const canvas = document.querySelector("canvas");
const game = Game.initialize("blue", "red");
game.currentPlayer = game.player1;

const a = new Application(game, canvas);
a.init();