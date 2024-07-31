import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer);
    let rooms = new Set();

    function updateRooms() {
        const activeRooms = new Set();
        for (const [id, socket] of io.of("/").sockets) {
            for (const room of socket.rooms) {
                if (room !== id) {  // Ignore the room that matches the socket id
                    activeRooms.add(room);
                }
            }
        }
        rooms = activeRooms;
        io.emit('roomList', Array.from(rooms));
    }

    io.on("connection", (socket) => {
        console.log("Connection");

        socket.emit('roomList', Array.from(rooms));

        socket.on('createRoom', (roomName) => {
            socket.join(roomName);
            rooms.add(roomName);
            updateRooms();
        });

        socket.on('joinRoom', (roomName) => {
            socket.join(roomName);
            socket.to(roomName).emit('userJoined', roomName);
            updateRooms();
        });

        socket.on('message', (data) => {
            socket.to(data.room).emit('message', data.message);
        });

        socket.on('disconnecting', () => {
            console.log('user disconnecting');
            updateRooms();
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
            updateRooms();
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