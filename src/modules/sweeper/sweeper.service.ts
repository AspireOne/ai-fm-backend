import { Paths } from "../../helpers/paths";
import fs from "fs";

export function getRandomSweeperPath() {
  const sweepersDir = Paths.sweepersDir;

  try {
    // 1. Get list of files in the sweepers directory
    const files = fs.readdirSync(sweepersDir);

    // Filter out non-files if needed (optional)
    const sweeperFiles = files.filter((file) =>
      fs.statSync(`${sweepersDir}/${file}`).isFile(),
    );

    if (sweeperFiles.length === 0) {
      return null;
    }

    // 2. Choose one at random
    const randomIndex = Math.floor(Math.random() * sweeperFiles.length);
    const randomSweeper = sweeperFiles[randomIndex];

    // 3. Return the file path
    return `${sweepersDir}/${randomSweeper}`;
  } catch (error) {
    console.error("Error getting random sweeper:", error);
    return null;
  }
}

export default {
  getRandomSweeper: getRandomSweeperPath,
};
