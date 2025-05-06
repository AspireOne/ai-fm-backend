#!/usr/bin/env node

const {
  intro,
  outro,
  select,
  isCancel,
  spinner,
  note,
} = require("@clack/prompts");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { execSync } = require("child_process");
const FormData = require("form-data");
const os = require("os");
const readline = require("readline");

// Simple color function implementations
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
  italic: (text) => `\x1b[3m${text}\x1b[0m`,
};

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--api-url' && i + 1 < args.length) {
      options.apiUrl = args[i + 1];
      i++; // Skip the next argument as it's the value
    }
  }
  
  return options;
}

// Configuration
const DEFAULT_API_URL = "https://fm-api.matejpesl.cz";
const args = parseArgs();
const API_URL = args.apiUrl || DEFAULT_API_URL;
const TEMP_DIR = path.join(os.tmpdir(), "ai-fm-temp");
const isWindows = os.platform() === "win32";

async function fetchRadios() {
  try {
    const response = await fetch(`${API_URL}/radios`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(colors.red(`Error fetching radios: ${error.message}`));
    if (error.response) {
      console.error(colors.red(`Status: ${error.response.status}`));
      console.error(colors.red(`Data: ${JSON.stringify(error.response.data)}`));
    }
    process.exit(1);
  }
}

async function fetchRadioBlocks(radioId) {
  try {
    const response = await fetch(`${API_URL}/radios/${radioId}/blocks`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(colors.red(`Error fetching radio blocks: ${error.message}`));
    if (error.response) {
      console.error(colors.red(`Status: ${error.response.status}`));
      console.error(colors.red(`Data: ${JSON.stringify(error.response.data)}`));
    }
    process.exit(1);
  }
}

// Create temp directory if it doesn't exist
function ensureTempDirExists() {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    console.log(`Created temporary directory: ${TEMP_DIR}`);
  }
}

// Clean up temp directory (only the files, not the directory itself)
function cleanupTempDir() {
  if (fs.existsSync(TEMP_DIR)) {
    try {
      // Ensure the path has 'ai-fm-temp' in it as a safety check
      if (!TEMP_DIR.includes('ai-fm-temp')) {
        console.log(`Safety check: Not cleaning temp directory ${TEMP_DIR} as it doesn't contain 'ai-fm-temp'`);
        return;
      }
      
      // Read all files in the directory
      const files = fs.readdirSync(TEMP_DIR);
      let filesDeleted = 0;
      
      // Delete each file (only .mp3 files for extra safety)
      for (const file of files) {
        const filePath = path.join(TEMP_DIR, file);
        if (fs.statSync(filePath).isFile() && file.endsWith('.mp3')) {
          fs.unlinkSync(filePath);
          filesDeleted++;
        }
      }
      
      console.log(`Cleaned up temporary files: ${filesDeleted} files deleted from ${TEMP_DIR}`);
    } catch (error) {
      console.error(colors.yellow(`Warning: Could not clean up temp directory: ${error.message}`));
    }
  }
}

// Check if a command is available in the system
function isCommandAvailable(command) {
  try {
    // Different check methods based on command
    if (command === 'ffmpeg') {
      // For ffmpeg, try different approaches
      try {
        // Try version flag first (most common)
        const nullOutput = isWindows ? "NUL" : "/dev/null";
        execSync(`${command} -version > ${nullOutput} 2>&1`);
        return true;
      } catch (e) {
        try {
          // Some ffmpeg builds use --version
          execSync(`${command} --version > ${isWindows ? "NUL" : "/dev/null"} 2>&1`);
          return true;
        } catch (e2) {
          try {
            // Last resort - just try to run it with -h
            execSync(`${command} -h > ${isWindows ? "NUL" : "/dev/null"} 2>&1`);
            return true;
          } catch (e3) {
            return false;
          }
        }
      }
    } else {
      // For other commands like yt-dlp
      const nullOutput = isWindows ? "NUL" : "/dev/null";
      execSync(`${command} --version > ${nullOutput} 2>&1`);
      return true;
    }
  } catch (error) {
    return false;
  }
}

// Show yt-dlp installation instructions
function showYtDlpInstructions() {
  console.log(colors.yellow("\nyt-dlp installation instructions:"));
  
  if (isWindows) {
    console.log(colors.cyan("\nFor Windows:"));
    console.log("\nOption 1 - Using pip (Python package manager):");
    console.log("  > python3 -m pip install -U \"yt-dlp[default]\"");
    console.log("Option 2 - Using winget:");
    console.log("  > winget install -e --id yt-dlp.yt-dlp");
    console.log("Option 3 - Manual download:");
    console.log("  1. Download from https://github.com/yt-dlp/yt-dlp/releases/tag/2025.04.30");
    console.log("  2. Rename the file to yt-dlp.exe");
    console.log("  3. Move it to a directory in your PATH (or add its location to PATH)");
  } else if (os.platform() === "darwin") {
    console.log(colors.cyan("\nFor macOS:"));
    console.log("  $ brew install yt-dlp");
  } else if (os.platform() === "linux") {
    console.log(colors.cyan("\nFor Linux:"));
    console.log("Option 1 - Using pip (Python package manager):");
    console.log("  $ python3 -m pip install -U \"yt-dlp[default]\"");
    console.log("\nOption 2 - Direct download:");
    console.log("  $ curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ~/.local/bin/yt-dlp");
    console.log("  $ chmod a+rx ~/.local/bin/yt-dlp");
  }
  
  console.log(colors.yellow("\nAfter installing, make sure yt-dlp is in your PATH and restart this script."));
}

// Show ffmpeg installation instructions
function showFfmpegInstructions() {
  console.log(colors.yellow("\nffmpeg installation instructions:"));
  
  if (isWindows) {
    console.log(colors.cyan("\nFor Windows:"));
    console.log("Option 1 - Using winget (probably as admin and restart terminal):");
    console.log("  > winget install --id Gyan.FFmpeg");
    console.log("\nOption 2 - Manual download:");
    console.log("  1. Download ffmpeg from https://ffmpeg.org/download.html");
    console.log("  2. Extract the archive and add the bin folder to your PATH");
  } 
  else if (os.platform() === "darwin") {
    console.log(colors.cyan("\nFor macOS:"));
    console.log("  $ brew install ffmpeg");
  } 
  else if (os.platform() === "linux") {
    console.log(colors.cyan("\nFor Linux (Ubuntu/Debian):"));
    console.log("  $ sudo apt install ffmpeg");
    console.log(colors.cyan("\nFor other Linux distributions:"));
    console.log("  Please use your distribution's package manager to install ffmpeg");
  }
  
  console.log(colors.yellow("\nAfter installing, make sure ffmpeg is in your PATH and restart this script."));
}

// Check if required tools are available
function checkRequiredTools() {
  const ytDlpAvailable = isCommandAvailable("yt-dlp");
  const ffmpegAvailable = isCommandAvailable("ffmpeg");

  console.log(`yt-dlp available in PATH: ${ytDlpAvailable}`);
  console.log(`ffmpeg available in PATH: ${ffmpegAvailable}`);

  let allToolsAvailable = true;

  if (!ytDlpAvailable) {
    console.error(colors.red("yt-dlp is not installed or not in PATH."));
    showYtDlpInstructions();
    allToolsAvailable = false;
  }

  if (!ffmpegAvailable) {
    console.error(colors.red("ffmpeg is not installed or not in PATH."));
    showFfmpegInstructions();
    allToolsAvailable = false;
  }

  return allToolsAvailable;
}

// Download song using yt-dlp
async function downloadSong(youtubeUrl, outputPath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${youtubeUrl}`);

    // Command arguments for yt-dlp
    const args = [
      youtubeUrl,
      "-x", // Extract audio
      "--audio-format",
      "mp3",
      "--audio-quality",
      "0", // Best quality
      "-o",
      outputPath,
    ];

    // Spawn the yt-dlp process
    const process = spawn("yt-dlp", args);

    let stderr = "";

    // Capture stdout (if you want to see progress)
    process.stdout.on("data", (data) => {
      const output = data.toString().trim();
      if (output.includes("%")) {
        console.log(`Downloading progress: ${output}`);
      }
    });

    // Capture stderr for error handling
    process.stderr.on("data", (data) => {
      stderr += data.toString();
      console.error(`yt-dlp error: ${data.toString().trim()}`);
    });

    // Handle process completion
    process.on("close", (code) => {
      if (code === 0) {
        console.log(`Downloaded successfully: ${outputPath}`);
        resolve(outputPath);
      } else {
        console.error(`Download failed: ${stderr}`);
        reject(new Error(`yt-dlp failed with code ${code}: ${stderr}`));
      }
    });

    // Handle process spawn errors
    process.on("error", (err) => {
      console.error(`Failed to start yt-dlp: ${err.message}`);
      reject(new Error(`Failed to start yt-dlp: ${err.message}`));
    });
  });
}

// Upload song to server
async function uploadSong(filePath, blockId, radioId) {
  try {
    console.log(`Uploading song for block ${blockId}`);

    // Use the old FormData module with proper node-formdata support
    const form = new FormData();
    form.append("blockId", blockId);
    form.append("radioId", radioId);
    form.append("file", fs.createReadStream(filePath), {
      filename: path.basename(filePath),
      contentType: "audio/mpeg",
    });

    // Use form.getHeaders() to get the correct Content-Type with boundary
    // This is required for multipart/form-data uploads
    const formHeaders = form.getHeaders();

    // Use form.pipe with node's http module as a fallback
    // This provides more reliable multipart/form-data uploads across Node versions
    return new Promise((resolve, reject) => {
      const url = new URL(`${API_URL}/radios/upload-songs`);
      const options = {
        method: 'POST',
        headers: formHeaders,
        host: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname,
        protocol: url.protocol
      };

      // Create the appropriate request object based on protocol
      const req = url.protocol === 'https:' 
        ? require('https').request(options)
        : require('http').request(options);
      
      // Handle response
      req.on('response', (res) => {
        // Get the response data
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              console.log(`Uploaded song for block ${blockId}`);
              resolve(JSON.parse(data));
            } catch (e) {
              console.error(`JSON parse error: ${e.message}`);
              reject(new Error(`Error parsing response: ${e.message}`));
            }
          } else {
            reject(new Error(`HTTP error: ${res.statusCode} ${res.statusMessage}`));
          }
        });
      });
      
      // Handle request errors
      req.on('error', (err) => {
        reject(err);
      });
      
      // Pipe the form data to the request
      form.pipe(req);
    });
  } catch (error) {
    console.error(
      colors.red(`Error uploading song for block ${blockId}: ${error.message}`),
    );
    if (error.response) {
      console.error(colors.red(`Status: ${error.response.status}`));
      console.error(colors.red(`Data: ${JSON.stringify(error.response.data)}`));
    }
    throw error;
  }
}

// Format blocks for display
function formatBlockType(type) {
  switch (type) {
    case "song":
      return colors.green(type);
    case "voiceover":
      return colors.blue(type);
    case "sweeper":
      return colors.yellow(type);
    default:
      return type;
  }
}

// Display blocks in a more readable format
function printBlocks(blocks, radioTitle) {
  note(colors.bold(`Blocks for radio: ${colors.cyan(radioTitle)}`), "Radio Blocks");

  console.log(colors.bold("Summary:"));
  console.log(`- Total blocks: ${blocks.total}`);
  console.log(`- Songs: ${blocks.songCount}`);
  console.log(`- Voiceovers: ${blocks.voiceoverCount}`);
  console.log(`- Sweepers: ${blocks.sweeperCount}`);
  console.log(`- Downloaded: ${blocks.downloadedCount} / ${blocks.total}\n`);

  console.log(colors.bold("All blocks:"));
  blocks.blocks.forEach((block, index) => {
    const blockType = formatBlockType(block.type);
    let details = "";

    if (block.type === "song" && block.yt) {
      details = block.yt.title
        ? colors.italic(block.yt.title)
        : colors.gray(colors.italic("(No title)"));
    }

    const downloadStatus = block.isDownloaded ? colors.green("✓") : colors.red("✗");

    console.log(
      `${index + 1}. [${blockType}] ID: ${block.id} ${downloadStatus} ${details}`,
    );
  });
}

async function main() {
  try {
    intro(colors.bold(colors.blue("AI FM Radio Downloader")));
    console.log(`API URL: ${API_URL}`);

    // Ensure temp directory exists
    ensureTempDirExists();

    // Fetch radios
    console.log("Fetching available radios...");
    const radios = await fetchRadios();

    if (radios.length === 0) {
      note(colors.yellow("No radios found."), "Empty");
      process.exit(0);
    }

    // Format choices for the selector
    const selectOptions = radios.map((radio) => ({
      label: `${radio.title} (${radio.songCount} songs, created ${new Date(radio.createdAt).toLocaleString()})`,
      value: { id: radio.id, title: radio.title },
    }));

    // Interactive selection
    const selectedRadio = await select({
      message: "Select a radio:",
      options: selectOptions,
    });

    // Handle cancellation
    if (isCancel(selectedRadio)) {
      outro("Selection cancelled");
      process.exit(0);
    }

    console.log(
      `\nFetching blocks for radio: ${selectedRadio.title} (${selectedRadio.id})...`,
    );
    const radioData = await fetchRadioBlocks(selectedRadio.id);
    
    // Filter song blocks
    const songBlocks = radioData.blocks.filter((block) => block.type === "song");
    console.log(`Found ${songBlocks.length} song blocks total`);

    if (songBlocks.length === 0) {
      note(colors.yellow("No songs found in this radio."), "Empty");
      process.exit(0);
    }

    // Process only not downloaded songs
    const songsToProcess = songBlocks.filter((block) => !block.isDownloaded);
    console.log(`Found ${songsToProcess.length} songs that need to be downloaded`);

    if (songsToProcess.length === 0) {
      note(colors.green("All songs are already downloaded!"), "Complete");
      process.exit(0);
    }
    
    // Only check for required tools if we have songs to download
    const s = spinner();
    s.start("Checking for required tools...");
    const toolsAvailable = checkRequiredTools();
    s.stop("Tools check completed");

    if (!toolsAvailable) {
      note(
        colors.red(
          "Required tools are missing. Please install yt-dlp and ffmpeg following the instructions above."
        ),
        "Error"
      );
      process.exit(1);
    }

    // Stats for tracking progress
    const stats = {
      total: songsToProcess.length,
      downloaded: 0,
      uploaded: 0,
      failed: 0,
      skipped: 0,
    };

    // Process each song
    for (const [index, block] of songsToProcess.entries()) {
      try {
        if (!block.yt?.url) {
          console.log(colors.yellow(`Skipping block ${block.id}: No YouTube URL found`));
          stats.skipped++;
          continue;
        }

        console.log(
          `\nProcessing song ${index + 1}/${songsToProcess.length}: ${block.yt.title || "Untitled"}`,
        );

        // Generate output path for the downloaded file
        const outputPath = path.join(TEMP_DIR, `${block.id}.mp3`);

        const s = spinner();
        s.start("Downloading song from YouTube...");

        // Download the song
        await downloadSong(block.yt.url, outputPath);
        stats.downloaded++;

        s.stop("Download complete");

        s.start("Uploading song to server...");
        // Upload the song
        await uploadSong(outputPath, block.id, selectedRadio.id);
        stats.uploaded++;

        s.stop("Upload complete");

        // Remove the temporary file
        fs.unlinkSync(outputPath);
        console.log(
          colors.green(
            `Successfully processed song ${index + 1}/${songsToProcess.length}`,
          ),
        );
      } catch (error) {
        console.error(
          colors.red(
            `Failed to process song ${index + 1}/${songsToProcess.length}: ${error.message}`,
          ),
        );
        stats.failed++;
      }
    }

    // Display summary
    note(colors.bold("Processing Results"), "Summary");
    console.log(`Total songs: ${stats.total}`);
    console.log(`Downloaded: ${colors.green(stats.downloaded)}`);
    console.log(`Uploaded: ${colors.green(stats.uploaded)}`);
    console.log(`Failed: ${colors.red(stats.failed)}`);
    console.log(`Skipped: ${colors.yellow(stats.skipped)}`);

    outro("All songs have been processed");
    process.exit(0);
  } catch (error) {
    console.error(colors.red(`An error occurred: ${error.message}`));
    process.exit(1);
  } finally {
    // Clean up temporary files
    cleanupTempDir();
    outro("Let's fucking go! Nonstop pop never dies!");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("\nPress ENTER to exit... (or do whatever the fuck you want im not your mom)", () => {
      rl.close();
    });
  }
}

// Create a package.json file if it doesn't exist
// Add this to package.json:
// {
//   "name": "ai-fm-radio-downloader",
//   "version": "1.0.0",
//   "description": "Download and upload songs for AI FM Radio",
//   "main": "song-cli.js",
//   "engines": {
//     "node": ">=14.0.0"
//   },
//   "dependencies": {
//     "@clack/prompts": "^0.10.1",
//     "axios": "^1.9.0",
//     "form-data": "^4.0.2"
//   }
// }

// Show help if requested
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`
AI FM Radio Downloader

Usage: node song-cli.js [options]

Features:
  - Download and upload missing songs from YouTube

Options:
  --api-url URL    Specify a custom API URL (default: ${DEFAULT_API_URL})
  (Temp directory is using system temp: ${TEMP_DIR})
  -h, --help       Show this help message
  `);
  process.exit(0);
}

// Run the main function
main().catch(error => {
  console.error(colors.red(`Fatal error: ${error.message}`));
  // Ensure cleanup happens even on unhandled errors
  cleanupTempDir();
  process.exit(1);
});
