import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer);
    let rooms = [];

    io.on("connection", (socket) => {
        console.log("Connection");

        socket.on('createRoom', (roomName) => {
            rooms.push(roomName);
            socket.join(roomName);
            io.emit('roomList', rooms);
        });

        socket.on('joinRoom', (roomName) => {
            socket.join(roomName);
            socket.to(roomName).emit('userJoined', roomName);
        });

        socket.on('joinRoom', (roomName) => {
            socket.join(roomName);
            socket.to(roomName).emit('userJoined', roomName);
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});