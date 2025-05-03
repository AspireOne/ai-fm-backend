import { createVoiceoverPrompt } from "./voiceover-prompt";
import { openai } from "../../providers/openai";
import { elevenlabs } from "../../providers/elevenlabs";
import { CreateVoiceoverProps } from "./voiceover.types";
import { Block } from "../radio/radio.types";
import assert from "node:assert";
import fs from "fs";
import audioFileManagerService from "../audio-file-manager/audio-file-manager.service";
import { VoiceSettings } from "elevenlabs/api";

const textGenerationModel = "openai/gpt-4.1-mini";
const elevenlabsProps = {
  voice: "Cara",
  model_id: "eleven_multilingual_v2", //"eleven_turbo_v2_5",
  voice_settings: {
    stability: 0.34,
    similarity_boost: 0.8,
    speed: 1.08,
    use_speaker_boost: true,
    // style: 0.2 // consumes additional resources
  } as VoiceSettings,
};

// We need previous voiceovers and prev/next song name.
async function generateVoiceoverText(props: CreateVoiceoverProps) {
  const prompt = createVoiceoverPrompt(props);
  console.debug(`Prompt for voiceover generation: ${prompt}`);

  const response = await openai.chat.completions.create({
    temperature: 1,
    model: textGenerationModel,
    messages: [{ role: "user", content: prompt }],
  });

  const responseText = response.choices?.[0]?.message?.content;
  console.debug(`Voiceover generation response: ${responseText}`);
  if (!responseText) {
    throw new Error("Empty response from OpenAI");
  }

  return responseText;
}

async function generateVoiceoverAudio(text: string) {
  return await elevenlabs.generate({
    ...elevenlabsProps,
    output_format: "mp3_44100_128",
    text: text,
  });
}

function getPreviousVoiceoverTexts(blocks: Block[], currIndex: number): string[] {
  if (currIndex === 0) return [];

  const block = blocks[currIndex];
  assert.ok(block);

  const paths = blocks
    .slice(0, currIndex)
    .filter((b) => b.type === "voiceover")
    .map((b) => audioFileManagerService.getVoiceoverTextPath(b.id));

  const texts = [];

  for (const path of paths) {
    const exists = fs.existsSync(path);
    if (!exists) {
      console.debug(`Previous voiceover block text file does not exist: ${path}`);
      continue;
    }
    const content = fs.readFileSync(path, { encoding: "utf-8" });
    texts.push(content);
  }

  console.debug(`Previous voiceover texts for block ${block.id}: ${texts}`);

  return texts;
}

export default {
  generateVoiceoverAudio,
  generateVoiceoverText,
  getPreviousVoiceoverTexts,
};
