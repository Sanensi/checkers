import express from "express";
import http from "http";
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express();
const server = new http.Server(app);

app.use(express.static(path.join(__dirname, '..', 'client')));

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log('Connect with \x1b[36m%s\x1b[0m', `http://localhost:${PORT}/`);
});