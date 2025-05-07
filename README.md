# Nonstop FM Backend

A Fastify-based backend service that powers dynamic radio streaming experiences. This application enables the creation and management of customized radio stations with automated DJ voiceovers, music sequencing, and continuous streaming.

## Overview

Nonstop FM Backend provides a complete infrastructure for building personalized radio experiences with AI narration and sweeper:

- **Dynamic Radio Creation**: Create radio stations from youtube songs, with customizable DJs (voice, personality), playlist, name, and more
- **AI Voice Integration**: Generate natural-sounding DJ moderator segments between songs that is aware of the songs playing
- **We have multiplayer**: Listen in more people at the same time - Real-time webcoket control and state updates for connected clients
- ***YouTube Integration**: Download audio from YouTube for inclusion in radio stations
- **Audio Management**: Handle song downloads, storage, and streaming
- **CLI tool for song download/upload**: Automatically download and upload songs for a radio locally, to work around server IP blocks



https://github.com/user-attachments/assets/fdb1777d-4538-4216-ae44-371f8db6f271

https://github.com/user-attachments/assets/278757f1-e755-4415-b139-52a71d4ca25a




## Development

### Prerequisites

- Make sure to add all .env variables (you can see them in env.ts)
- **yt-dlp**: The application requires [yt-dlp](https://github.com/yt-dlp/yt-dlp) to be installed and accessible in your system PATH
- **FFmpeg**: Required for audio processing and conversion (yt-dlp dependency)

#### Installing Dependencies

For Linux systems, you can use the provided script:

```bash
# Make the script executable
chmod +x scripts/install-dependencies.sh

# Run the installation script
./scripts/install-dependencies.sh
```

For Windows:

1. Install FFmpeg: Download from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH
2. Install yt-dlp: `pip install yt-dlp` or download the executable from [yt-dlp releases](https://github.com/yt-dlp/yt-dlp/releases)

### Song Download Tools

Several Node.js scripts are included to help with song management:

- **song-cli.js** - Interactive CLI tool for downloading and uploading songs:
  - Requires Node.js 14 or later
  - Dependencies: `@clack/prompts`, `form-data`
  - Pre-built binaries available in `.bin` directory

The interactive `song-cli.js` tool handles the YouTube download and upload process in one step and is the recommended option for most users.

```bash
# Install dependencies
pnpm install

# Run in development mode with hot reload
pnpm dev

# Database migrations
pnpm migrate

# Create database migration
pnpm migrate:create add_table_users

# Rollback the last migration
pnpm migrate:down
```

## Handling YouTube Songs

YouTube blocks song downloads from many server IP addresses. To work around this limitation, the project includes utilities for manually downloading and uploading songs:

### Interactive Song Downloader (Recommended)

The easiest way to download and upload songs is with the interactive CLI tool:

```bash
# Install dependencies
npm install @clack/prompts form-data

# Run the interactive CLI
node song-cli.js
```

This interactive tool will:
- Connect to the API server
- Show you a list of available radios
- Download all missing songs for the selected radio
- Upload them to the server
- Handle everything automatically with a friendly interface

Pre-built binaries are also available in the `.bin` directory for Windows, macOS, and Linux.

## Manual Song Upload CLI tool & Why the tool exist

Since many server hosting providers have IP addresses that YouTube blocks for automated downloads, you'll often need to:

1. Run these tools on your local machine (which is less likely to be blocked)
2. Download the songs through your home/office internet connection
3. Upload them to the server

All these tools facilitate this workflow, with the interactive `song-cli.js` being the most user-friendly option.

## Project Structure

The application follows a modular architecture (same as NestJS) with clear separation of concerns:

### Core Components

Each module follows a consistent structure:

```
src/modules/[module]/
 ├── [module].controller.ts
 └── [module].service.ts
 └── [module].types.ts
 └── [module].utils.ts
 └── [module].constants.ts
 └── dto
   └── [module]-voiceover.dto.ts (example)
 └── ... any other files ...
```

- **Module**: A self-contained feature or functionality

  - Located in `src/modules/`
  - Encapsulates controllers, services, DTOs, types, and any other files related to a specific feature
  - Can e.g. only have a service (only encapsulate logic), does not have to expose a controller

- **Controllers**: Handle HTTP requests and route them to appropriate services

  - Located in `src/modules/*/controller.ts` (e.g., `radio.controller.ts`)
  - Does NOT handle business logic, only routing
  - Follow naming pattern: `[module].controller.ts`

- **Services**: Contain business logic and application functionality

  - Located in `src/modules/*/service.ts` (e.g., `radio-core.service.ts`)
  - Follow naming pattern: `[module].service.ts`

- **DTOs**: Data transfer objects (DTOs)
  - Located in `src/modules/*/dto/` (e.g., `radio-voiceover.dto.ts`)
  - Follow naming pattern: `[name].dto.ts`
  - Contains types/schemas for route inputs/outputs, e.g. fastify schema definitions for controllers

IMPORTANT:

Again, a module can contain only a service. Services should be encapsulated within a module,
and most logic should be contained in a service to follow encapsulation and single responsibility principles.

### Exporting / naming

- Controllers: Export only one function: register[Module]Controller (e.g. registerRadioController)
- Services: Export only one DEFAULT, unnamed function, that contains all of the others: export default { functionA,
  functionB, functionC... }

### Infrastructure components

- **Providers**: Clients, external services, connections...

  - Located in `src/providers/` (e.g., `elevenlabs.ts`, `kysely-dialect.ts`)
  - Handle database connections, API clients, etc.

- **Helpers**: Project-specific utility functions

  - Located in `src/helpers/` (e.g., `migrate-latest.ts`)
  - Related to specific project tasks (like database migrations)

- **Utils**: Generic utility functions
  - Located in `src/utils/` (e.g., `detect-project-root.ts`)
  - General-purpose functions not tied to specific business logic

## Other components

- **env.ts**: Environment variables

  - Shorthand for accessing environment variables
  - Validates and throws an error if a required variable is missing

- **paths.ts**: Pre-defined file/directory paths for the project

  - Contains paths to important files and directories
  - Makes it easier to access these paths (use the `Paths` constant)
  - Can be used to validate the existence of these paths

- **resources**: Static resources (e.g., audio files)

  - Can be used to store static resources like audio files, images...
  - Can be accessed using the `Paths.resourcesDir` constant

- **downloaded_files**: Locally downloaded file

  - A directory that can contain downloaded files that are not part of the project
  - When this project is hosted, files in this directory will be preserved during server restarts

- **migrations**: Database migrations
  - Contains database migrations (when running `pnpm migrate`, it will run these migrations)

## Naming Conventions

- **Files**: Use kebab-case for filenames (e.g., `openapi-client.ts`)
- **Files**: Use a suffix, just like in controllers/services etc., e.g. `radio-voiceover.type.ts`


![image](https://github.com/user-attachments/assets/e58830df-b595-4406-9b8b-f685aef9b95d)

![fb24874b5f49453a93754ea16ee4a416](https://github.com/user-attachments/assets/b147c9dc-1c7d-4457-a81f-085ea125e47e)
