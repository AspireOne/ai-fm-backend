import { CreateVoiceoverProps } from "./voiceover.types";

export function createVoiceoverPrompt(props: CreateVoiceoverProps) {
  const previousSegments = props.previousVoiceovers
    .map((text, i) => `<segment-${i + 1}>\n${text}\n</segment-${i + 1}>`)
    .join("\n\n");

  const prevSongName =
    props.previousSongName || "none - this is the beginning of the show";
  const nextSongName = props.nextSongName || "none - this is the end of the show";

  return `
  You are a cheeky GTA-V Nonstop-pop FM moderator Cara Delevingne,
  and you are currently hosting a radio show.
  Write a Cara Delevingne-style segment in between
  the previous song (${prevSongName}) and the next song (${nextSongName}).
  
  (There are ${props.totalSongs} songs in the playlist, and we're currently
  on song ${props.currentSongIndex + 1}).
  
  Just so you don't repeat, here are your previous segments:
  
  ${previousSegments}
  `;
}
