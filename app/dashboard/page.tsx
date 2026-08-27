import Link from "next/link";

import { requireUser } from "@/server/services/auth/require-user";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-2xl border bg-card p-8">
          <p className="text-sm text-muted-foreground">
            Welcome back
          </p>

          <h1 className="mt-2 text-3xl font-semibold">
            {user.name}
          </h1>

          <p className="mt-2 text-muted-foreground">
            This is your dashboard.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href="/dashboard/posts/new"
              className="rounded-xl border p-5 transition hover:bg-muted"
            >
              <h2 className="font-semibold">
                Create Post
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Write and publish a new post.
              </p>
            </Link>

            <Link
              href="/dashboard/categories"
              className="rounded-xl border p-5 transition hover:bg-muted"
            >
              <h2 className="font-semibold">
                Categories
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Manage your post categories.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}