import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2).max(100),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;