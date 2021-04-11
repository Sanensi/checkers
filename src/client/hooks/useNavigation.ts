import { pathsOf } from "../utils/Paths";

const root = pathsOf({
  PATH: '/',
  local: {
    PATH: 'local',
    game: {
      PATH: 'game'
    }
  },
  online: {
    PATH: 'online',
    lobby: {
      PATH: 'lobby',
      room: {
        PATH: 'room'
      }
    },
    game: {
      PATH: 'game'
    }
  }
});

export function useRoot() {
  return root;
}
