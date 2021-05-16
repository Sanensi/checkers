import { Router } from "express";
import { LobbyService } from "../services/LobbyService";
import { LobbyRouter } from "./LobbyRouter";

export function Root(lobbyService: LobbyService) {
  const root = Router();

  root.use('/online/lobby', LobbyRouter(lobbyService));

  root.all('/*', (req, res) => {
    res.sendStatus(404);
  });

  return root;
}



