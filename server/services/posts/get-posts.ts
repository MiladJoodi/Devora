import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { desc } from "drizzle-orm";

export async function getPosts(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  return db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .limit(limit)
    .offset(offset);
}