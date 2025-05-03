import { FastifyInstance } from "fastify";
import websocketService from "./websocket.service";
import radioStateService from "../radio/radio-state.service";
import { WebSocketMessage } from "./websocket.types";
import * as assert from "node:assert";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function registerWebSocketController(_fastify: FastifyInstance) {
  const fastify = _fastify.withTypeProvider<ZodTypeProvider>();
  // Handle WebSocket connections for a specific radio
  // Note: do NOT do any assync work BEFORE attaching .on('message') listeners.
  fastify.get(
    "/ws/radio/:radioId",
    {
      websocket: true,
    },
    (request, reply) => {
      const { radioId } = request.params as { radioId: string };
      assert.ok(radioId, "radioId is required");

      console.log(`New WebSocket connection for radio ${radioId}`);

      // Register the connection
      websocketService.registerConnection(radioId, request.socket);

      // Handle messages from the client
      request.socket.on("message", async (message: any) => {
        try {
          const data = JSON.parse(message.toString()) as WebSocketMessage;
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
              /*case "play":
              await radioStateService.setPlayState(radioId, "playing");
              break;
            case "pause":
              await radioStateService.setPlayState(radioId, "paused");
              break;*/
              case "get_current_state":
                await radioStateService.sendCurrentState(radioId);
                break;
              default:
                console.log(`Unknown command: ${data.command}`);
            }
          }
        } catch (error) {
          console.error("Error processing client message:", error);
        }
      });

      // Handle connection close
      request.socket.on("close", () => {
        console.log(`WebSocket connection closed for radio ${radioId}`);
        websocketService.removeConnection(radioId, request.socket);
      });

      // Send the current state after connection is established
      radioStateService.sendCurrentState(radioId).catch((err) => {
        console.error(`Error sending initial state for radio ${radioId}:`, err);
      });
    },
  );
}
