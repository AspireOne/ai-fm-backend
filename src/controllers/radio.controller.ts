import path from "path";
import { createReadStream } from "fs";
import { promisify } from "util";
import { FastifyInstance } from "fastify";
import * as fs from "node:fs";
import { join } from "node:path";
import { ensureAudioDir, ensureAudioFile } from "../utils/checkAudioDir";
import {
  getCurrentSong,
  getPlaybackState,
  initRadio,
  nextSong,
  startPlayback,
} from "../utils/radio-state";
import { Paths } from "../helpers/paths";

export interface Song{
  id: string
  url: string
  filePath: string
}

const AUDIO_DIR = Paths.downloadedFilesDir;
const statAsync = promisify(fs.stat);

export function setupRadioRoutes(fastify: FastifyInstance) {
  ensureAudioDir(AUDIO_DIR);

  const playlist = [
    {
      id: "IT",
      url: "https://www.youtube.com/watch?v=FQlAEiCb8m0",
      filePath: join(AUDIO_DIR, "IT.mp3"),
    },
    {
      id: "Shimmy",
      url: "https://www.youtube.com/watch?v=2x_Pv6v2quw",
      filePath: join(AUDIO_DIR, "Shimmy.mp3"),
    },
  ];

  initRadio(playlist);
  startPlayback();

  setInterval(
    async () => {
      try {
        const song = nextSong();
        if (song) {
          await ensureAudioFile(song.url, song.id, AUDIO_DIR);
          console.log(`Now playing: ${song.id}`);
        }
      } catch (error) {
        console.error("Error changing songs:", error);
      }
    },
    4 * 60 * 1000,
  );

  fastify.get("/radio-state", (request, reply) => {
    return getPlaybackState();
  });

  fastify.get("/stream", async (request, reply) => {
    try {
      const query = request.query as any;
      const songId = query.song || getCurrentSong()?.id;
      const song = playlist.find((s) => s.id === songId);

      if (!song) {
        return reply.status(404).send("Song not found");
      }

      reply.header("Content-Type", "audio/mpeg");
      reply.header("Accept-Ranges", "bytes");
      reply.header("Cache-Control", "no-cache");
      reply.header("Access-Control-Allow-Origin", "*");

      await ensureAudioFile(song.url, song.id, AUDIO_DIR);
      const fileStats = await statAsync(song.filePath);

      const range = request.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileStats.size - 1;
        const chunkSize = end - start + 1;

        reply.header("Content-Range", `bytes ${start}-${end}/${fileStats.size}`);
        reply.header("Content-Length", chunkSize);
        reply.status(206);

        const stream = createReadStream(song.filePath, { start, end });
        return reply.send(stream);
      } else {
        reply.header("Content-Length", fileStats.size);
        const stream = createReadStream(song.filePath);
        return reply.send(stream);
      }
    } catch (error) {
      console.error("Error:", error);
      return reply.status(500).send("Internal server error");
    }
  });

  fastify.get("/now-playing", async (request, reply) => {
    return getPlaybackState();
  });

  fastify.get("/next-song", async (request, reply) => {
    const song = nextSong();
    if (song) {
      await ensureAudioFile(song.url, song.id, AUDIO_DIR);
    }
    return {
      success: !!song,
      currentSong: song?.id,
    };
  });
}
