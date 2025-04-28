import { ElevenLabsClient } from "elevenlabs";
import { env } from "./env";

export const elevenlabs = new ElevenLabsClient({
  apiKey: env.ELEVENLABS_API_KEY,
});

/* Example:
const audio = await elevenlabs.generate({
  voice: "Cara",
  text: "I am become death. The destroyer of world. Shimi shimi shimi sama yo.",
  model_id: "eleven_turbo_v2_5",
  voice_settings: {
    stability: 0.32,
    similarity_boost: 0.87,
    // style: 0.2 // consumes additional resources
  }
});

* */
