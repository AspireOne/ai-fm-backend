FROM node:22-slim

# Set working directory
WORKDIR /app

# Install dependencies for yt-dlp and FFmpeg
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp (try apt first, then pip with override if necessary)
RUN apt-get update && \
    apt-get install -y yt-dlp || \
    pip3 install --no-cache-dir --break-system-packages yt-dlp

# Verify installations
RUN yt-dlp --version && ffmpeg -version

# Install pnpm 9.x as specified in package.json engines
RUN npm install -g pnpm@9

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies (including devDependencies for build, but skip prepare script)
RUN pnpm install --ignore-scripts --production=false

# Copy application source
COPY . .

# Create directory for downloaded files with correct permissions
RUN mkdir -p /app/downloaded_files && chmod 777 /app/downloaded_files

# Create a custom tsconfig.build.json file that excludes database-related files
COPY tsconfig.build.json ./tsconfig.build.json

# Build the application with the custom config
RUN pnpm exec tsc -p tsconfig.build.json --skipLibCheck

# Set production environment
ENV NODE_ENV=production

# Add a healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:${PORT:-3000}/ || exit 1

# Create a simple startup script
RUN echo '#!/bin/bash\n\
# Start the application\n\
exec node dist/index.js\n' > /app/start.sh && chmod +x /app/start.sh

# Use the startup script as the entry point
CMD ["/app/start.sh"]
