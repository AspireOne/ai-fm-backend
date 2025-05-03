# Nonstop FM Backend

A Fastify-based backend service for a radio streaming application.

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
   └── [module]-input.dto.ts (example)
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
  - Located in `src/modules/*/dto/` (e.g., `radio-input.dto.ts`)
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
  - Located in `src/utils/` (e.g., `detect-project-root.utils.ts`)
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
- **Files**: Use a suffix, just like in controllers/services etc., e.g. `radio-input.type.ts`

## Development

- Make sure to add all .env variables (you can see them in env.ts)

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
