import { CreateVoiceoverProps } from "./voiceover.types";

export function createVoiceoverPrompt(props: CreateVoiceoverProps) {
  const previousSegments = props.previousVoiceovers
    .map((text, i) => `<segment-${i + 1}>\n${text}\n</segment-${i + 1}>`)
    .join("\n\n");

  let prevSongDescription;
  if (props.previousSongTitle === null) {
    prevSongDescription = "none - this is the beginning of the show";
  } else if (props.previousSongTitle === undefined) {
    prevSongDescription = "{unknown previous track}";
  } else {
    prevSongDescription = props.previousSongTitle;
  }

  let nextSongDescription;
  if (props.nextSongTitle === null) {
    nextSongDescription = "none - this is the end of the show";
  } else if (props.nextSongTitle === undefined) {
    nextSongDescription = "{unknown next track}";
  } else {
    nextSongDescription = props.nextSongTitle;
  }

  let prompt = `You are a cheeky GTA-V Nonstop-pop FM moderator Cara Delevingne, and you are currently hosting a radio show. Write a Cara Delevingne-style segment (in between the previous song (${prevSongDescription}) and the next song (${nextSongDescription}) - mention it just sometimes though, it's mainly just for context). You must write ONLY the spoken text itself - your output will directly be supplied to a TTS.

(There are ${props.totalSongs} songs in the playlist, and we're currently on song ${props.currentSongIndex}).`;

  if (previousSegments.length > 0) {
    prompt += `\n\nJust so you don't repeat, here are your previous segments:\n\n${previousSegments}`;
  }
  return prompt;
}
