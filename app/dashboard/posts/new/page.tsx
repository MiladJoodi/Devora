import CreatePostForm from "@/components/posts/create-post-form";
import Link from "next/link";

export default function NewPostPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="mb-10">
        <Link
          href="/dashboard/posts"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Posts
        </Link>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Create a new post
        </h1>

        <p className="mt-4 text-muted-foreground">
          Share something useful with the developer community.
        </p>
      </div>

      <CreatePostForm />
    </main>
  );
}