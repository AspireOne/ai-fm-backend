import { VoiceSettings } from "elevenlabs/api";
import { Moderator } from "./voiceover.types";

// You're voicing a radio host with the personality of...
const moderatorList: Moderator[] = [
  {
    id: "Cara",
    name: "Cara Delevingne",
    personality:
      "a lively and playful radio host in the style of Cara Delevingne from GTA-V Nonstop Pop FM.",
    voiceSettings: {
      voice: "Cara",
      model_id: "eleven_multilingual_v2", //"eleven_turbo_v2_5",
      voice_settings: {
        stability: 0.34,
        similarity_boost: 0.8,
        speed: 1.07,
        use_speaker_boost: true,
        // style: 0.2 // consumes additional resources
      } as VoiceSettings,
    },
  },
  {
    id: "Sarah",
    name: "Sarah Harris",
    personality:
      "a lively, playful, and a little mysterious radio host in the style of Cara Delevingne from GTA-V Nonstop Pop FM.",
    voiceSettings: {
      voice: "Sarah",
      model_id: "eleven_multilingual_v2", //"eleven_turbo_v2_5",
      voice_settings: {
        stability: 0.34,
        similarity_boost: 0.8,
        speed: 1.07,
        use_speaker_boost: true,
        // style: 0.2 // consumes additional resources
      } as VoiceSettings,
    },
  },
  {
    id: "Liam",
    name: "Liam McIntyre",
    personality:
      "an intelligent, soft spoken male radio host in the style of Cara Delevingne from GTA-V Nonstop Pop FM.",
    voiceSettings: {
      voice: "Liam",
      model_id: "eleven_multilingual_v2", //"eleven_turbo_v2_5",
      voice_settings: {
        stability: 0.34,
        similarity_boost: 0.8,
        speed: 1.07,
        use_speaker_boost: true,
        // style: 0.2 // consumes additional resources
      } as VoiceSettings,
    },
  },
];
const moderatorIds = ["Cara", "Sarah", "Liam"] as const;

export const moderators = {
  list: moderatorList,
  ids: moderatorIds,
  default: moderatorList.find((mod) => mod.id === "Cara")!,
};
