import http from "http";
import fs from "fs";
import { WebSocketServer } from "ws";

const PORT = 3001;

// 1. Create the HTTP server to serve the frontend UI
const server = http.createServer((req, res) => {
    fs.readFile('./public/index.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

// 2. Create the WebSocketServer attached to the HTTP server
const wss = new WebSocketServer({ server });

// Helper function to broadcast a serialized message to all currently connected clients
const broadcast = (messageObject) => {
    const serialized = JSON.stringify(messageObject);
    wss.clients.forEach((client) => {
        if (client.readyState === 1) { // 1 means OPEN
            client.send(serialized);
        }
    });
};

// 3. Register the 'connection' listener
wss.on('connection', (socket, req) => {
    // 4. Parse the username from the URL query string
    const username = new URL(req.url, "http://localhost").searchParams.get("username");

    // Immediately broadcast a system message indicating they joined
    broadcast({ type: "system", text: `${username} joined` });

    // 5. Register the 'message' listener for chat messages
    socket.on('message', (data) => {
        try {
            const { username: msgUsername, text } = JSON.parse(data.toString());
            broadcast({ type: 'chat', username: msgUsername, text });
        } catch (err) {
            console.error("Failed to parse incoming message:", err);
        }
    });

    // 6. Register the 'close' listener when a client disconnects
    socket.on('close', () => {
        broadcast({ type: 'system', text: `${username} left` });
    });
});

// 7. Start the server
server.listen(PORT, () => {
    console.log(`Chat server running at http://localhost:${PORT}`);
});
