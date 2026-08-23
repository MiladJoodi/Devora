import Link from "next/link";

import type { InferSelectModel } from "drizzle-orm";
import { posts } from "@/server/db/schema";

type Post = InferSelectModel<typeof posts>;

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No posts yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <article key={post.id} className="rounded-xl border p-6">
          <Link href={`/posts/${post.slug}`}>
            <h2 className="text-xl font-semibold">
              {post.title}
            </h2>
          </Link>

          {post.excerpt && (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {post.excerpt}
            </p>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            {post.createdAt.toLocaleDateString()}
          </p>
        </article>
      ))}
    </div>
  );
}