import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { categories, posts } from "@/server/db/schema";

type CreatePostInput = {
  title: string;
  slug: string;
  content: string;
  authorId: string;
  categoryId: string;
};

export async function createPost(data: CreatePostInput) {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, data.categoryId),
  });

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  const [post] = await db
    .insert(posts)
    .values({
      title: data.title,
      slug: data.slug,
      content: data.content,
      authorId: data.authorId,
      categoryId: data.categoryId,
    })
    .returning();

  return post;
}