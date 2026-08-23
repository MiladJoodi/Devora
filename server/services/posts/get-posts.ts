import { count, desc } from "drizzle-orm";

import { db } from "@/server/db";
import { posts } from "@/server/db/schema";

export async function getPosts(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const [data, totalResult] = await Promise.all([
    db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset),

    db
      .select({ count: count() })
      .from(posts),
  ]);

  return {
    data,
    total: totalResult[0].count,
  };
}