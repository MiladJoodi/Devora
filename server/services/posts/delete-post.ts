import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { posts } from "@/server/db/schema";

export async function deletePost(slug: string) {
  const [deletedPost] = await db
    .delete(posts)
    .where(eq(posts.slug, slug))
    .returning();

  return deletedPost ?? null;
}