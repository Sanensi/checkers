import { Namespace } from "socket.io";
import { PlayerConfig } from "../../app/game/GameData";

export function setupOnline(ns: Namespace) {
  ns.on('connection', (socket) => {
    console.log(`${socket.id} has connected!`);

    const num = Math.ceil(Math.random() * 1000);
    const color = '#' + Math.floor(Math.random() * 0x1000000).toString(16);
    socket.emit('player-init', num, color);

    socket.on('create-player', (config: PlayerConfig) => {
      console.log(config);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} has disconnected`);
    });
  });
}
