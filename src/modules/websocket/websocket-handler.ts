import { WebSocket } from 'ws';
import websocketService from './websocket.service';
import radioStateService from '../radio/radio-state.service';
import { WebSocketMessage } from './websocket.types';

/**
 * Handles a WebSocket connection for a specific radio
 * @param socket The WebSocket connection
 * @param radioId The ID of the radio
 */
export function handleRadioWebSocket(socket: WebSocket, radioId: string) {
  console.log(`New WebSocket connection for radio ${radioId}`);

  // Register the connection
  websocketService.registerConnection(radioId, socket);

  // Handle messages from the client
  socket.on('message', async (messageData) => {
    try {
      const message = messageData.toString();
      const data = JSON.parse(message) as WebSocketMessage;
      console.log(`Received message from client for radio ${radioId}:`, data);

      // Handle navigation commands
      if (data.type === "command") {
        switch (data.command) {
          case "next":
            await radioStateService.skipNext(radioId);
            break;
          case "previous":
            await radioStateService.skipPrevious(radioId);
            break;
          case "get_current_state":
            await radioStateService.sendCurrentState(radioId);
            break;
          default:
            console.warn(`Unknown command: ${data.command}`);
        }
      }
    } catch (error) {
      console.error("Error processing client message:", error);
    }
  });

  // Handle connection close
  socket.on('close', () => {
    console.log(`WebSocket connection closed for radio ${radioId}`);
    websocketService.removeConnection(radioId, socket);
  });

  // Send the current state after connection is established
  radioStateService.sendCurrentState(radioId).catch((err) => {
    console.error(`Error sending initial state for radio ${radioId}:`, err);
  });
}
