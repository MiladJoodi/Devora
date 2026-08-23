import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { posts } from "@/server/db/schema";

export async function getPostBySlug(slug: string) {
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  return post;
}