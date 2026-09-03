import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { posts } from "@/server/db/schema";

type UpdatePostInput = {
  slug: string;
  title: string;
  content: string;
  categoryId: string;
};

export async function updatePost(data: UpdatePostInput) {
  const [updatedPost] = await db
    .update(posts)
    .set({
      title: data.title,
      content: data.content,
      categoryId: data.categoryId,
      updatedAt: new Date(),
    })
    .where(eq(posts.slug, data.slug))
    .returning();

  return updatedPost ?? null;
}