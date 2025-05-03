import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { handleRadioWebSocket } from "./websocket-handler";

// WebSocket route definitions
type WSRouteHandler = (ws: WebSocket, id: string) => void;

interface WSRoute {
  pattern: string;
  handler: WSRouteHandler;
}

// Define available WebSocket routes
const wsRoutes: WSRoute[] = [
  {
    pattern: "/ws/radio/",
    handler: handleRadioWebSocket,
  },
  // Add more routes here as needed
];

/**
 * Routes a WebSocket connection to the appropriate handler based on the URL path
 * @param ws The WebSocket connection
 * @param pathname The pathname from the URL
 * @returns True if the path was handled, false otherwise
 */
function handleWebSocketRouting(ws: WebSocket, pathname: string): boolean {
  // Find the first matching route
  for (const route of wsRoutes) {
    if (pathname.startsWith(route.pattern)) {
      const id = pathname.slice(route.pattern.length);
      
      if (id) {
        route.handler(ws, id);
        return true;
      }
    }
  }

  // No matching handler found
  return false;
}

/**
 * Sets up a WebSocket server on an existing HTTP server
 * @param server The HTTP server to attach the WebSocket server to
 */
export function setupWebSocketServer(server: http.Server): void {
  const wss = new WebSocketServer({ server });

  // Set up WebSocket connection handler
  wss.on("connection", (ws, req) => {
    try {
      const url = new URL(req.url || "", `http://${req.headers.host}`);
      const pathname = url.pathname;

      // Route the WebSocket connection based on the pathname
      const handled = handleWebSocketRouting(ws, pathname);

      if (!handled) {
        console.error("Unknown WebSocket endpoint:", pathname);
        ws.close(1008, "Unknown endpoint");
      }
    } catch (error) {
      console.error("Error handling WebSocket connection:", error);
      ws.close(1011, "Internal server error");
    }
  });

  console.log("WebSocket server initialized");
}
