import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { posts } from "@/server/db/schema";

export async function getPostBySlug(slug: string) {
    const decodedSlug = decodeURIComponent(slug);

    const [post] = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, decodedSlug))
        .limit(1);

    return post;
}