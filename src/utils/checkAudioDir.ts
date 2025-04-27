import { access } from "node:fs/promises";
import * as fs from "node:fs";
import ytdl from "@distube/ytdl-core";

const ensureAudioDir = async (dir: string): Promise<void> => {
  try {
    await access(dir);
  } catch (error) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const ensureAudioFile = async (youtubeUrl: string, id: string, dir: string): Promise<string> => {

  const filePath = `${dir}/${id}.mp3`;

  try {
    await access(filePath)
    console.log(`File ${filePath} already exists.`);
    return filePath;
  } catch (error) {
    console.log(`Downloading ${id}.mp3 from YouTube...`);

    return new Promise<string>((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);

      ytdl(youtubeUrl, {
        filter: 'audioonly',
        quality: 'highestaudio',
      })
        .pipe(writeStream)
        .on('finish', () => {
          console.log(`Download complete: ${id}.mp3`);
          resolve(dir);
        })
        .on('error', (err: Error) => {
          console.error(`Error downloading ${id}.mp3:`, err);
          reject(err);
        });
    });
  }
};


export {
  ensureAudioDir,
  ensureAudioFile
}
