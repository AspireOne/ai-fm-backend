// radio-state.ts

import { Song } from "../controllers/radio.controller";

type PlaybackState = {
  currentSong: Song | null;
  playbackStartTime: number;
  isPlaying: boolean;
  playlist: Song[];
};

// Initial state
let radioState: PlaybackState = {
  currentSong: null,
  playbackStartTime: 0,
  isPlaying: false,
  playlist: []
};

export function initRadio(playlist: Song[]): void {
  radioState = {
    currentSong: playlist.length > 0 ? playlist[0] : null,
    playbackStartTime: 0,
    isPlaying: false,
    playlist
  };
}

export function startPlayback(): void {
  radioState.playbackStartTime = Date.now();radioState.isPlaying = true;
}

export function getPlaybackState() {
  if (!radioState.isPlaying || !radioState.currentSong) {
    return { isPlaying: false, currentSong: null, position: 0 };
  }

  const elapsedTime = (Date.now() - radioState.playbackStartTime) / 1000; // in seconds
  return {
    isPlaying: true,
    currentSong: radioState.currentSong,
    position: elapsedTime,
    serverTime: Date.now()
  };
}

export function nextSong(): Song | null {
  if (!radioState.currentSong || radioState.playlist.length === 0) {
    return null;
  }

  const currentIndex = radioState.playlist.findIndex(song => song.id === radioState.currentSong?.id);
  const nextIndex = (currentIndex + 1) % radioState.playlist.length;
  radioState.currentSong = radioState.playlist[nextIndex];
  radioState.playbackStartTime = Date.now();

  return radioState.currentSong;
}

export function getCurrentSong(): Song | null {
  return radioState.currentSong;
}

export function getPlaylist(): Song[] {
  return [...radioState.playlist];
}