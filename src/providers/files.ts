import {Paths} from "./paths";
import * as fs from "node:fs";

function getSweeperFileName(index: number): string {
  return `sweeper_${index}.mp3`;
}

function getSweeperFileNames(): string[] {
  const dir = Paths.sweepersDir;
  return fs.readdirSync(dir);
}

function getSweeperCount(): number {
  const dir = Paths.sweepersDir;
  const dirItems = fs.readdirSync(dir);
  return dirItems.length;
}

export const Files = {
  getSweeperFileName,
  getSweeperFileNames,
  getSweeperCount,
}