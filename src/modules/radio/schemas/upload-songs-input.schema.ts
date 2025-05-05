import { z } from "zod";

export const uploadSongsInputSchema = z.object({
  songs: z.array(
    z.object({
      blockId: z.string(),
      radioId: z.string(),
      fileBuffer: z.instanceof(Buffer),
      filename: z.string()
    })
  )
});

export type UploadSongsInputSchema = z.infer<typeof uploadSongsInputSchema>;
