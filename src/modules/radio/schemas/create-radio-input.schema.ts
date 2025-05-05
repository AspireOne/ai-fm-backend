import { z } from "zod";
import { moderators } from "../../voiceover/voiceover-moderators";

export const createRadioInputSchema = z.object({
  songs: z
    .array(
      z.object({
        url: z.string().url("Must be an url").max(155),
      }),
    )
    .min(5)
    .max(50)
    .nonempty(),
  title: z.string().max(100),
  description: z.string().max(255).optional(),
  is_public: z.boolean().optional().default(true),
  voice_id: z.enum(moderators.ids).optional(),
  voice_description: z.string().max(2000).optional(),
});

export type CreateRadioInputSchema = z.infer<typeof createRadioInputSchema>;
