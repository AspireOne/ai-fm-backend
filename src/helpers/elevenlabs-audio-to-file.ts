import fs from "fs";
import * as Stream from "node:stream";

export async function elevenlabsAudioToFile(
  audio: Stream.Readable,
  targetFilePath: string,
) {
  try {
    // Create a write stream to the file
    const fileStream = fs.createWriteStream(targetFilePath);

    // Process each chunk from the audio stream
    for await (const chunk of audio) {
      fileStream.write(chunk);
    }

    // Close the file stream when done
    fileStream.end();

    console.log(`Elevenlabs audio saved to ${targetFilePath} successfully`);
  } catch (error) {
    console.error("Error processing audio stream:", error);
  }
}
