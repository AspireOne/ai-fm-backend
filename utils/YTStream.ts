import * as ytdl from "ytdl-core";
import * as streamLib from "stream";
import * as FFmpeg from "fluent-ffmpeg";
import {PathLike, createWriteStream} from "node:fs";


export interface Format {
  readonly container: string;
  readonly audioEncoding: string | null;
  readonly audioBitrate: number | null;
}

export interface Options extends ytdl.downloadOptions {
  readonly file?: PathLike;
  readonly videoFormat?: string;
  readonly audioFormat?: string;
}


const streamYT = (uri: string, opt: Options) => {
  if (!uri) throw new TypeError("youtube url not specified");
  const options = {
    ...opt,
    videoFormat: "mp4",
    quality: "lowest",
    audioFormat: "mp3",
    filter(format: Format) {
      return format.container === options.videoFormat && format.audioBitrate;
    },
  };

  const video = ytdl(uri, options);
  const { file, audioFormat } = options;
  const stream = file ? createWriteStream(file) : new streamLib.PassThrough();
  const ffmpeg = FFmpeg(video);

  process.nextTick(() => {
    const output = ffmpeg.format(audioFormat).pipe(stream);

    ffmpeg.once("error", (error: Error) => stream.emit("error", error));
    output.once("error", (error: Error) => {
      video.end();
      stream.emit("error", error);
    });
  });

  stream.video = video;
  stream.ffmpeg = ffmpeg;

  return stream;
};

export default streamYT;
