import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3).max(200),

  content: z.string().min(10),

  categoryId: z.string().uuid(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;