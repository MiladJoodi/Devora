import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10),
  categoryId: z.string().uuid(),
  status: z.enum(["draft", "published"]),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10),
  categoryId: z.string().uuid(),
  status: z.enum(["draft", "published"]),
});

export type UpdatePostInput = z.infer<typeof updatePostSchema>;