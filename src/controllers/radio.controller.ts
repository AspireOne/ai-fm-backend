import path from 'path';
import { fileURLToPath } from 'url';
import {createReadStream} from "fs";
import { promisify } from 'util';
import {FastifyInstance} from "fastify";
import {RadioState} from "../types/radio-state.type";
import { stat} from 'fs/promises';
import * as fs from "node:fs";
import { ensureAudioDir, ensureAudioFile } from "../utils/checkAudioDir";
import { join } from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = path.join(__dirname, '../audio');
const statAsync = promisify(fs.stat);

interface Song {
  id: string;
  url: string;
  filePath: string;
}

export function setupRadioRoutes(fastify: FastifyInstance) {
  ensureAudioDir(AUDIO_DIR);
  const playlist: Song[] = [
    { id: "IT", url: "https://www.youtube.com/watch?v=FQlAEiCb8m0", filePath: join(AUDIO_DIR, "IT.mp3") },
    {id: "Shimmy", url: "https://www.youtube.com/watch?v=2x_Pv6v2quw", filePath: join(AUDIO_DIR, "Shimmy.mp3")},
  ];

  let currentSongIndex = 0;

  fastify.get('/stream', async (request, reply) => {
    try {
      reply.header('Content-Type', 'audio/mpeg');
      reply.header('Accept-Ranges', 'bytes');
      reply.header('Cache-Control', 'no-cache');
      reply.header('Access-Control-Allow-Origin', '*'); // CORS header
      const currentSong = playlist[currentSongIndex];
      await ensureAudioFile(currentSong.url, currentSong.id, AUDIO_DIR);
      const fileStats = await statAsync(currentSong.filePath);
      const range = request.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileStats.size - 1;
        const chunkSize = (end - start) + 1;
        reply.header('Content-Range', `bytes ${start}-${end}/${fileStats.size}`);
        reply.header('Content-Length', chunkSize);
        reply.status(206); // Partial Content
        const stream = createReadStream(currentSong.filePath, { start, end });
        return reply.send(stream);
      } else {
        reply.header('Content-Length', fileStats.size);
        const stream = createReadStream(currentSong.filePath);
        return reply.send(stream);
      }
    } catch (error) {
      console.error('Error:', error);
      return reply.status(500).send('Internal server error');
    }
  });

  fastify.get('/next-song', async (request, reply) => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    return {
      success: true,
      currentSong: playlist[currentSongIndex].id
    };
  });

  fastify.get('/now-playing', async (request, reply) => {
    return {
      currentSong: playlist[currentSongIndex]
    };
  });
}