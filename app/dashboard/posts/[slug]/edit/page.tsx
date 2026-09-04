import { notFound } from "next/navigation";

import EditPostForm from "@/components/posts/edit-post-form";
import { requireUser } from "@/server/services/auth/require-user";
import { getPostBySlug } from "@/server/services/posts/get-post-by-slug";

type EditPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EditPostPage({
  params,
}: EditPostPageProps) {
  await requireUser();

  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">
          Edit Post
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update your post.
        </p>

        <div className="mt-8">
          <EditPostForm
            slug={post.slug}
            title={post.title}
            content={post.content}
            categoryId={post.categoryId}
          />
        </div>
      </div>
    </main>
  );
}