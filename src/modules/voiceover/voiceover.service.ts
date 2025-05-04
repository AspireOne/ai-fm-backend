import { createVoiceoverPrompt } from "./voiceover-prompt";
import { openai } from "../../providers/openai";
import { elevenlabs } from "../../providers/elevenlabs";
import { CreateVoiceoverProps, Moderator } from "./voiceover.types";
import { Block } from "../radio/radio.types";
import assert from "node:assert";
import fs from "fs";
import audioFileManagerService from "../audio-file-manager/audio-file-manager.service";

const textGenerationModel = "openai/gpt-4o";

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

async function generateVoiceoverAudio(text: string, moderator: Moderator) {
  return await elevenlabs.generate({
    ...moderator.voiceSettings,
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
