import Link from "next/link";

type Post = {
    id: string;
    title: string;
    slug: string;
    status: string;
    createdAt: Date;
    categoryName: string;
};

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
                <article
                    key={post.id}
                    className="rounded-xl border p-6"
                >
                    <Link href={`/posts/${post.slug}`}>
                        <h2 className="text-xl font-semibold">
                            {post.title}
                        </h2>
                    </Link>

                    <p className="mt-2 text-sm text-muted-foreground">
                        {post.categoryName}
                    </p>

                    <p className="mt-4 text-xs text-muted-foreground">
                        {post.createdAt.toLocaleDateString()}
                    </p>
                </article>
            ))}
        </div>
    );
}