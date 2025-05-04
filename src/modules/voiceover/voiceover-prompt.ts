import { CreateVoiceoverProps } from "./voiceover.types";

export function createVoiceoverPrompt(props: CreateVoiceoverProps) {
  const prevSegments = props.previousVoiceovers
    .map((text, i) => `Previous Segment ${i + 1}:\n${text}`)
    .join("\n\n");

  const prevSongTitle = formatPreviousSongTitle(props.previousSongTitle);
  const nextSongTitle = formatNextSongTitle(props.nextSongTitle);

  const introLine = `You're a radio show host. You're voicing ${props.voiceDescription}. The radio show's name is "${props.radioTitle}".`;
  const contextLine = `You're between songs — the last one was "${prevSongTitle}", and the next is "${nextSongTitle}". (You can mention them only rarely)`;
  const progressLine = `We're at song ${props.currentSongIndex} out of ${props.totalSongs}.`;
  const historyNote =
    props.previousVoiceovers.length > 0
      ? `Here's what you've said so far — avoid repeating yourself:\n\n\n${prevSegments}`
      : "";

  return `${introLine}
${contextLine}
${progressLine}

Now write the next voiceover segment. Keep it casual, cheeky, and full of personality. You can include an anecdote, social commentary, a short story, or even something serious, it's up to you. Most inputs should be under 20s, some can be up to 1 minute. Output only the spoken text—no stage directions or notes.

${historyNote}`;
}

function formatPreviousSongTitle(previousSongTitle: string | undefined | null) {
  if (previousSongTitle === null) {
    return "{unknown previous track}";
    //return "{none - this is the beginning of the show}";
  } else if (previousSongTitle === undefined) {
    return "{unknown previous track}";
  } else {
    return previousSongTitle;
  }
}

function formatNextSongTitle(nextSongTitle: string | undefined | null) {
  if (nextSongTitle === null) {
    return "{unknown next track}";
    // return "{none - this is the end of the show}";
  } else if (nextSongTitle === undefined) {
    return "{unknown next track}";
  } else {
    return nextSongTitle;
  }
}
