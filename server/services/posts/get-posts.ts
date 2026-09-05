import { count, desc, eq } from "drizzle-orm";

import { db } from "@/server/db";
import { categories, posts } from "@/server/db/schema";

export async function getPosts(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const [data, totalResult] = await Promise.all([
    db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      status: posts.status,
      createdAt: posts.createdAt,
      categoryName: categories.name,
    })
      .from(posts)
      .innerJoin(
        categories,
        eq(posts.categoryId, categories.id),
      )
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