import { RadioState } from "../radio/radio.types";
import { WebSocket } from "ws";

// Store active connections by radio ID
const connections: Record<string, Set<WebSocket>> = {};

/**
 * Register a new WebSocket connection for a specific radio
 * @param radioId The ID of the radio to register for
 * @param socket The WebSocket connection
 */
function registerConnection(radioId: string, socket: WebSocket): void {
  if (!connections[radioId]) {
    connections[radioId] = new Set();
  }
  connections[radioId].add(socket);
  console.log(
    `New connection registered for radio ${radioId}. Total: ${connections[radioId].size}`,
  );
}

/**
 * Remove a WebSocket connection
 * @param radioId The ID of the radio
 * @param socket The WebSocket connection to remove
 */
function removeConnection(radioId: string, socket: WebSocket): void {
  if (connections[radioId]) {
    connections[radioId].delete(socket);
    console.log(
      `Connection removed for radio ${radioId}. Remaining: ${connections[radioId].size}`,
    );

    // Clean up empty sets
    if (connections[radioId].size === 0) {
      delete connections[radioId];
      console.log(`No more connections for radio ${radioId}, cleaned up.`);
    }
  }
}

/**
 * Broadcast a state update to all clients connected to a specific radio
 * @param radioId The ID of the radio to broadcast to
 * @param state The state to broadcast
 */
function broadcastUpdate(radioId: string, state: RadioState): void {
  if (!connections[radioId]) {
    return;
  }

  const message = JSON.stringify({
    type: "state_update",
    data: state,
  });

  let closedConnections = 0;

  connections[radioId].forEach((socket) => {
    try {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      } else if (
        socket.readyState === WebSocket.CLOSED ||
        socket.readyState === WebSocket.CLOSING
      ) {
        closedConnections++;
      }
    } catch (error) {
      console.error(`Error sending message to client:`, error);
    }
  });

  // Log broadcast info
  console.log(
    `Broadcasted update to ${connections[radioId].size - closedConnections} clients for radio ${radioId}`,
  );
}

/**
 * Get the number of active connections for a radio
 * @param radioId The ID of the radio
 * @returns The number of active connections
 */
function getConnectionCount(radioId: string): number {
  return connections[radioId]?.size || 0;
}

export default {
  registerConnection,
  removeConnection,
  broadcastUpdate,
  getConnectionCount,
};
