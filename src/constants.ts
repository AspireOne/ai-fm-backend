/**
 * Project-wide constants.
 * Local / module-specific (/ feature-specific) constants should be in the appropriate module.
 * */
export const constants = {
  textModel: "google/gemini-2.0-flash-001",
  elevenlabsCara: {
    voice: "Cara",
    model_id: "eleven_turbo_v2_5",
    voice_settings: {
      stability: 0.32,
      similarity_boost: 0.87,
      // style: 0.2 // consumes additional resources
    }
  }
}