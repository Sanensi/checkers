import "./style.scss";
import { Application } from "../app/Application";
import { Game } from "../app/game/Game";

const gameRoot = document.getElementById("game");
const canvas = document.querySelector("canvas");

const menuRoot = document.getElementById("menu-root");
const main = document.getElementById("main-menu");
const local = document.getElementById("local");
const online = document.getElementById("online");
const panels = [main, local, online];

function hide(e: HTMLElement) {
    e.classList.add("is-hidden");
}

function show(e: HTMLElement) {
    e.classList.remove("is-hidden");
}

function goTo(panel: HTMLElement) {
    panels.forEach(hide);
    show(panel);
}

const p1Name = document.getElementById("p1-name") as HTMLInputElement;
const p2Name = document.getElementById("p2-name") as HTMLInputElement;
const p1Color = document.getElementById("p1-color") as HTMLInputElement;
const p2Color = document.getElementById("p2-color") as HTMLInputElement;

const onlineName = document.getElementById("online-name") as HTMLInputElement;
const onlineColor = document.getElementById("online-color") as HTMLInputElement;

function launchLocal() {
    hide(menuRoot);
    show(gameRoot);
    
    const game = Game.initialize(p1Color.value, p2Color.value);
    const app = new Application(game, canvas);
    app.init();
}

function launchOnline() {

}

document.getElementById("local-btn").addEventListener("click", () => goTo(local));
document.getElementById("online-btn").addEventListener("click", () => goTo(online));
document.getElementById("start-local-btn").addEventListener("click", launchLocal);
document.getElementById("start-online-btn").addEventListener("click", () => {});
document.getElementsByName("back-btn").forEach(btn =>
    btn.addEventListener("click", () => goTo(main))
);