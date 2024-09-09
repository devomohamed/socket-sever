const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the CORS package

// Create an Express app
const app = express();

// Use CORS middleware to allow all origins
app.use(cors());

// Create an HTTP server
const server = http.createServer(app);

// Integrate Socket.io with CORS settings to allow all origins
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
    credentials: true // Allow credentials if needed
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
