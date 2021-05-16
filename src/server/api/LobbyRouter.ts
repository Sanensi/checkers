import { Router } from "express";
import { LobbyService } from "../services/LobbyService";

export function LobbyRouter(lobbyService: LobbyService) {
  const route = Router();

  return route;
}