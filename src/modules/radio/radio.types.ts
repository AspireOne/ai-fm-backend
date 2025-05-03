import { Radios } from "kysely-codegen";

export type BlockType = "song" | "sweeper" | "input";
/**
 * The state sent to the client using WS.
 */
export type RadioState = {
  radioId: string;
  radioTitle: string;
  radioDescription?: string;
  block: {
    id: string;
    type: BlockType;
    position: number;
    title: string;
  };
  totalBlocks: number;
  hasNext: boolean;
  hasPrev: boolean;
  playState: "loading" | "playing" | "paused" | "Stopped";
};

export type DbBlock = {
  type: BlockType;
  id: string;
  url?: string;
};

export type ParsedRadio = {
  id: string;
  description: string | null;
  title: string;
  blocks: DbBlock[];
};
