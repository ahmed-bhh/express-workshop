const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const routerChat = require('./routes/chat');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/chat', routerChat);

// Socket.IO configuration
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});