export type CreateVoiceoverProps = {
  previousVoiceovers: string[];
  previousSongTitle: string | undefined | null;
  nextSongTitle: string | undefined | null;
  totalSongs: number;
  currentSongIndex: number;
};
