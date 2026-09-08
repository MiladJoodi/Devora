import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { categories, posts } from "@/server/db/schema";

export async function getPostBySlug(slug: string) {
    const decodedSlug = decodeURIComponent(slug);

    const [post] = await db
        .select({
            id: posts.id,
            title: posts.title,
            slug: posts.slug,
            excerpt: posts.excerpt,
            content: posts.content,
            coverImage: posts.coverImage,
            status: posts.status,
            publishedAt: posts.publishedAt,
            authorId: posts.authorId,
            categoryId: posts.categoryId,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt,
            categoryName: categories.name,
        })
        .from(posts)
        .innerJoin(
            categories,
            eq(posts.categoryId, categories.id),
        )
        .where(eq(posts.slug, decodedSlug))
        .limit(1);

    return post;
}