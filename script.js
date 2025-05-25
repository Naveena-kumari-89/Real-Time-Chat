const socket = new WebSocket('ws://localhost:3000');

const chatBox = document.getElementById('chat-box');
const input = document.getElementById('messageInput');

// Display your message in chat and send to server
function sendMessage() {
  const message = input.value.trim();
  if (message) {
    // Display locally
    appendMessage(You: ${message});
    
    // Send to server
    socket.send(message);
    input.value = '';
  }
}

// Display any incoming message
socket.onmessage = (event) => {
  appendMessage(Stranger: ${event.data});
};

// Helper function to add message to chat box
function appendMessage(msg) {
  const msgDiv = document.createElement('div');
  msgDiv.textContent = msg;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}                                                                                                                                server.js                                                                                                                                                                                                                                                        const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // Broadcast to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log("WebSocket server started on ws://localhost:3000");
