const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

// Fyers API Keys (Render ke Environment Variables se uthayega)
const FYERS_API_ID = process.env.FYERS_API_ID;
const FYERS_SECRET_KEY = process.env.FYERS_SECRET_KEY;

app.get('/', (req, res) => {
    res.json({ 
        status: "Online", 
        message: "Fyers Real-Time Backend is Running 24/7!",
        apiConfigured: !!FYERS_API_ID 
    });
});

// Real-time Socket Connection
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Fyers Backend Server running on port ${PORT}`);
});
