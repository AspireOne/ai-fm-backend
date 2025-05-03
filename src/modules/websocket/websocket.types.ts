/** The frontend must honor this. */
export type WebSocketMessage = {
  type: "command";
  command: "next" | "previous" | "play" | "pause" | "get_current_state";
};
