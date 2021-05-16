import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { setupOnlineActions, setupOnlineEvents } from "./namespaces/LobbyNamespace";
import { LobbyService } from "./services/LobbyService";
import { Root } from "./api/Root";

const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const onlineNamespace = io.of('online/lobby');
const lobbyEvents = setupOnlineEvents(onlineNamespace);
const lobbyService = new LobbyService(lobbyEvents);
setupOnlineActions(onlineNamespace, lobbyService);

const clientPath = path.join(__dirname, '..', 'client');

app.use(express.static(clientPath));
app.use('/api', Root(lobbyService));
app.get('/*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log('Connect with \x1b[36m%s\x1b[0m', `http://localhost:${PORT}/`);
});
