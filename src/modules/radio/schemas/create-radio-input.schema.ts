// TODO
import { z } from "zod";

export const createRadioInputSchema = z.object({
  songs: z
    .array(
      z.object({
        url: z.string().min(1).max(255),
      }),
    )
    .nonempty(),
  title: z.string().max(100),
  description: z.string().max(1000).optional(),
});

export type CreateRadioInputSchema = z.infer<typeof createRadioInputSchema>;
