const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

function setupWebSocket(onMessageReceived) {
  // Handling new client connections
  wss.on("connection", (ws) => {
    console.log("WebSocket client connected");

    // Converting client message to JSON and sending to handler
    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message);
        if (data.sendValue !== undefined) {
          await onMessageReceived(data.sendValue);
          console.log("Received from client and wrote to OPC UA:", data.sendValue);
        }

      } catch (e) {
        console.error("Invalid message from client:", message);
      }
    });

  });
}

function broadcast(data) {
  // Sending data to all connected clients
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  });
}

module.exports = {
  broadcast,
  setupWebSocket,
};
