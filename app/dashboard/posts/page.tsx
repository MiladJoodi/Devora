import Link from "next/link";

import { requireUser } from "@/server/services/auth/require-user";
import { getPosts } from "@/server/services/posts/get-posts";
import PostActions from "@/components/posts/post-actions";

type PostsPageProps = {
    searchParams: Promise<{
        page?: string;
    }>;
};

export default async function PostsPage({
    searchParams,
}: PostsPageProps) {
    await requireUser();

    const params = await searchParams;

    const page = Math.max(Number(params.page) || 1, 1);
    const limit = 10;

    const { data: posts, total } = await getPosts(page, limit);

    const totalPages = Math.ceil(total / limit);

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
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/posts/${post.slug}`}
                                                    className="rounded-md border px-3 py-1.5 hover:bg-muted"
                                                >
                                                    View
                                                </Link>

                                                <PostActions
                                                    slug={post.slug}
                                                    title={post.title}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Page {page} of {totalPages}
                        </span>

                        <div className="flex gap-2">
                            {page > 1 && (
                                <Link
                                    href={`/dashboard/posts?page=${page - 1}`}
                                    className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
                                >
                                    Previous
                                </Link>
                            )}

                            {page < totalPages && (
                                <Link
                                    href={`/dashboard/posts?page=${page + 1}`}
                                    className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}