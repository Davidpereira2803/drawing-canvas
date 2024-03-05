const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let users = 0;

app.use(express.static('public'));

io.on('connection', (socket) => {
  users = users + 1;
  console.log(`One user connected ${users}`);

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });

  socket.on('disconnect', () => {
    users = users - 1;
    console.log(`One user disconnected ${users}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
