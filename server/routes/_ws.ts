let clients = new Map();

export function sendToClient(
  clientId: any,
  message: { user: string; message: string; timestamp: string }
) {
  const client = clients.get(clientId);
  if (client) {
    client.send(JSON.stringify(message));
  } else {
    console.log(
      `[ws] Cannot send message, client ${clientId} is not connected.`
    );
  }
}

export default defineWebSocketHandler({
  open(peer) {
    console.log("[ws] open", peer);
  },

  message(peer, message) {
    const receivedMessage = message.text();

    if (receivedMessage.startsWith("SetID")) {
      const id = receivedMessage.split("/")[1];
      clients.set(id, peer);
    }

    console.log("[ws] message", peer, receivedMessage);
  },

  close(peer, event) {
    console.log("[ws] close", peer, event);
    for (const [key, value] of clients.entries()) {
      if (value === peer) {
        clients.delete(key);
        console.log(`Client removed: ${key}`);
        break;
      }
    }
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});
