import ytdl from "@distube/ytdl-core";
import {Readable } from "stream";

interface StreamifyOptions {
  videoFormat?: string;
  quality?: string;
  audioFormat?: string;
  file?: string;
  filter?: (format: ytdl.videoFormat) => boolean;
}

const streamify = async (uri: string, userOpt?: StreamifyOptions): Promise<Readable> => {
  const info = await ytdl.getInfo(uri);
  const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

  if (!audioFormat) {
    throw Error('404 | No audio format found');
  }

  const stream = ytdl(uri, { format: audioFormat });

  stream.on('error', (err) => {
    console.error('Stream error:', err);
    throw err;
  });
  return stream;
}


export default streamify;
