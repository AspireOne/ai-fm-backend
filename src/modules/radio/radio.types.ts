export type RadioState = {
  radioId: string;
  block: {
    id: string;
    position: number;
    type: "song" | "voiceover" | "sweeper";
    title: string;
    avatarUrl?: string;
  };
  totalBlocks: number;
  hasNext: boolean;
  hasPrev: boolean;
  playState: "loading" | "playing" | "paused" | "Stopped";
};

export type CreateRadioInput = {
  name: string;
  description: string;
  songs: string[];
};
