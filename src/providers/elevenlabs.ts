import {ElevenLabsClient} from "elevenlabs";
import {env} from "./env";

export const elevenlabs = new ElevenLabsClient({
  apiKey: env.ELEVENLABS_API_KEY
});

/* Example:
const audio = await elevenlabs.generate({
    voice: "Sarah",
    text: "Hello! 你好! Hola! नमस्ते! Bonjour! こんにちは! مرحبا! 안녕하세요! Ciao! Cześć! Привіт! வணக்கம்!",
    model_id: "eleven_multilingual_v2",
});
* */