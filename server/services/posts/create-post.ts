import { db } from "@/server/db";
import { posts } from "@/server/db/schema";

type CreatePostInput = {
  title: string;
  slug: string;
  content: string;
  authorId: string;
  categoryId: string;
};

export async function createPost(data: CreatePostInput) {
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