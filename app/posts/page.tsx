import PostList from "@/components/posts/post-list";
import Pagination from "@/components/posts/pagination";
import { getPosts } from "@/server/services/posts/get-posts";

type PostsPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function PostsPage({
  searchParams,
}: PostsPageProps) {
  const { page } = await searchParams;

  const currentPage = Math.max(Number(page) || 1, 1);

  const { data: posts, total } = await getPosts(
    currentPage,
    10,
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">
          COMMUNITY
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Latest posts
        </h1>

        <p className="mt-4 text-muted-foreground">
          Explore ideas, experiences, and knowledge from the
          developer community.
        </p>
      </div>

      <div className="mt-10">
        <PostList posts={posts} />

        <Pagination
          currentPage={currentPage}
          total={total}
          limit={10}
        />
      </div>
    </main>
  );
}