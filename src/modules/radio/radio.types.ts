import { Radios } from "kysely-codegen";

export type Block = {
  type: "song" | "sweeper" | "voiceover";
  id: string;
  yt?: {
    url: string;
    title: string;
  };
};

/**
 * The state sent to the client using WS.
 */
export type RadioState = {
  radioId: string;
  radioTitle: string;
  radioDescription?: string;
  block: {
    id: string;
    type: Block["type"];
    position: number;
    title: string;
    streamUrl: string; // URL to stream the audio for this block
  };
  totalBlocks: number;
  hasNext: boolean;
  hasPrev: boolean;
  playState: "loading" | "playing" | "paused" | "Stopped";
};

export type ParsedRadio = {
  id: string;
  description: string | null;
  title: string;
  blocks: Block[];
};
