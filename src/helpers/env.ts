import * as dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env["PORT"] ?? 3000),
  NODE_ENV: process.env["NODE_ENV"] ?? "development",
  DATABASE_URL: process.env["DATABASE_URL"]!,
  OPENROUTER_API_KEY: process.env["OPENROUTER_API_KEY"]!,
  ELEVENLABS_API_KEY: process.env["ELEVENLABS_API_KEY"]!,
};

export function validateEnv(environment: Record<string, unknown>): void {
  const missingVars: string[] = [];

  for (const [key, value] of Object.entries(environment)) {
    if (value === undefined || value === null) {
      missingVars.push(key);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
  }
}
