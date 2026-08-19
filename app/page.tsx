import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-6 py-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground">
            Welcome to Devora
          </div>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Share your ideas.
            <br />
            <span className="text-muted-foreground">
              Build something meaningful.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Devora is a place for developers to share knowledge,
            discover interesting ideas, and learn from each other.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-md bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80"
            >
              Get started
            </Link>

            <Link
              href="/dashboard"
              className="rounded-md border px-5 py-3 text-sm font-medium transition hover:bg-muted"
            >
              Explore posts
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          <Feature
            title="Write"
            description="Share your knowledge, experience, and ideas with other developers."
          />

          <Feature
            title="Discover"
            description="Find useful posts and interesting ideas from the community."
          />

          <Feature
            title="Connect"
            description="Join discussions and learn from developers around you."
          />
        </div>
      </section>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}