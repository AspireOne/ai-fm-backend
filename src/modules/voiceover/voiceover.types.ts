import { VoiceSettings } from "elevenlabs/api";

export type CreateVoiceoverProps = {
  previousVoiceovers: string[];
  previousSongTitle: string | undefined | null;
  nextSongTitle: string | undefined | null;
  totalSongs: number;
  currentSongIndex: number;
  radioTitle?: string;
  voiceId: string;
  voiceDescription: string;
};

export type Moderator = {
  id: string;
  name: string;
  personality: string;
  voiceSettings: { voice: string; model_id: string; voice_settings: VoiceSettings };
};