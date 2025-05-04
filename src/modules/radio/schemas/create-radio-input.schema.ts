// TODO
import { z } from "zod";

export const createRadioInputSchema = z.object({
  songs: z
    .array(
      z.object({
        url: z.string().min(1).max(50),
      }),
    )
    .nonempty(),
  title: z.string().max(100),
  description: z.string().max(255).optional(),
  is_public: z.boolean().optional().default(true),
});

export type CreateRadioInputSchema = z.infer<typeof createRadioInputSchema>;
