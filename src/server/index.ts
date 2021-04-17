import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { setupOnline } from "./namespaces/online";

const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const clientPath = path.join(__dirname, '..', 'client');

app.use(express.static(clientPath));
app.get('/*', function (req, res) {
  res.sendFile(path.join(clientPath, 'index.html'));
});

setupOnline(io.of('online/lobby'));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log('Connect with \x1b[36m%s\x1b[0m', `http://localhost:${PORT}/`);
});
