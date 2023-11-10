const socket = io();

const username = prompt('Ingresa tu nombre:');
socket.emit('new user', username);

socket.on('user connected', (users) => {
    updateUsersList(users);
});

socket.on('chat message', (data) => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${data.username}: ${data.message}`;
    document.getElementById('messages').appendChild(messageDiv);
});

socket.on('user disconnected', (users) => {
    updateUsersList(users);
});

function sendMessage() {
    const message = document.getElementById('message-input').value;
    socket.emit('chat message', message);
    document.getElementById('message-input').value = '';
}

function updateUsersList(users) {
    const usersList = users.join(', ');
    document.getElementById('users').textContent = `Usuarios conectados: ${usersList}`;
}
