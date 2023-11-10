const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

const connectedUsers = {};

io.on('connection', (socket) => {
    socket.on('new user', (username) => {
        connectedUsers[socket.id] = username;
        io.emit('user connected', Object.values(connectedUsers));
    });

    socket.on('chat message', (message) => {
        io.emit('chat message', { username: connectedUsers[socket.id], message });
    });

    socket.on('disconnect', () => {
        delete connectedUsers[socket.id];
        io.emit('user disconnected', Object.values(connectedUsers));
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
