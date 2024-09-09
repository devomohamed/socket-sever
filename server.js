const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the CORS package

// Create an Express app
const app = express();

// Use CORS middleware to allow your Angular app to connect
app.use(cors({
  origin: "http://localhost:4100", // Your Angular app's origin
  methods: ["GET", "POST"],
  credentials: true // Allow credentials to be sent if necessary
}));

// Create an HTTP server
const server = http.createServer(app);

// Integrate Socket.io with CORS settings
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4100", // Your Angular app's URL
    methods: ["GET", "POST"],
    credentials: true // Allow credentials for Socket.io
  }
});

// Handle client connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from the client
    socket.on('sendMessage', (message) => {
        console.log('Message received from client: ', message);

        // Send a response back to the client
        socket.emit('receiveMessage', `Server received your message: ${message}`);
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3200;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
