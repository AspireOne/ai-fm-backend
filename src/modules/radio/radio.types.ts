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
  moderator: {
    id: string;
    name: string;
    personality: string;
  };
  totalBlocks: number;
  hasNext: boolean;
  hasPrev: boolean;
  status: {
    status: "downloading" | "generating" | "ready";
    progress?: number; // 0-100 percentage if available
  };
  totalSongs: number;
  totalDownloadedSongs: number;
};

export type ParsedRadio = {
  id: string;
  description: string | null;
  title: string;
  voice_id: string;
  voice_description: string;
  blocks: Block[];
};

export type RadiosResponse = {
  id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  blockCount: number;
  songCount: number;
  createdAt: string;
}[];
