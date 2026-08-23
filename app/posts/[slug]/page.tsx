import { notFound } from "next/navigation";

import { getPostBySlug } from "@/server/services/posts/get-post-by-slug";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({
  params,
}: PostPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <article>
        <h1 className="text-4xl font-semibold tracking-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className="mt-6 text-sm text-muted-foreground">
          {post.createdAt.toLocaleDateString()}
        </div>

        <div className="mt-10 whitespace-pre-wrap leading-8">
          {post.content}
        </div>
      </article>
    </main>
  );
}