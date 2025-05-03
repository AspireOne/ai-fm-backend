export type AudioManagerVoiceoverMetadata = {
  previousSongName?: string;
  nextSongName?: string;
  totalSongs: number;
};

export type PrepareBlockAudioProps =
  | {
      blockId: string;
      blockType: "song";
      ytUrl: string;
      voiceoverProps?: never;
      currentSongIndex?: never;
    }
  | {
      blockId: string;
      blockType: "input";
      ytUrl?: never;
      voiceoverProps: AudioManagerVoiceoverMetadata;
      currentSongIndex: number;
    }
  | {
      blockId: string;
      blockType: "sweeper";
      ytUrl?: never;
      voiceoverProps?: never;
      currentSongIndex: number;
    };
