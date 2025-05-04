export type Block = {
  type: "song" | "sweeper" | "voiceover";
  id: string;
  yt?: {
    url: string;
    title: string | null;
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
  status: {
    status: "downloading" | "generating" | "ready";
    progress?: number; // 0-100 percentage if available
  };
};

export type ParsedRadio = {
  id: string;
  description: string | null;
  title: string;
  blocks: Block[];
};

export type RadiosResponse = {
  id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  blockCount: number;
  songCount: number;
}[];
