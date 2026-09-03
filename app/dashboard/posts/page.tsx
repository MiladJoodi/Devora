import Link from "next/link";

import { requireUser } from "@/server/services/auth/require-user";
import { getPosts } from "@/server/services/posts/get-posts";

export default async function PostsPage() {
  await requireUser();

  const { data: posts } = await getPosts();

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Posts</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your posts.
            </p>
          </div>

          <Link
            href="/dashboard/posts/new"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          >
            Create Post
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-5 py-4 text-left font-medium">
                  Title
                </th>
                <th className="px-5 py-4 text-left font-medium">
                  Status
                </th>
                <th className="px-5 py-4 text-left font-medium">
                  Created
                </th>
                <th className="px-5 py-4 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-8 text-center text-muted-foreground"
                  >
                    No posts found.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b last:border-0"
                  >
                    <td className="px-5 py-4 font-medium">
                      {post.title}
                    </td>

                    <td className="px-5 py-4">
                      {post.status}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {post.createdAt.toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="rounded-md border px-3 py-1.5 hover:bg-muted"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}