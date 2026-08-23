import PostList from "@/components/posts/post-list";
import Link from "next/link";

const features = [
  {
    title: "Write",
    description:
      "Turn your experience and ideas into useful content for other developers.",
  },
  {
    title: "Discover",
    description:
      "Explore practical knowledge, opinions, and ideas from the developer community.",
  },
  {
    title: "Connect",
    description:
      "Join discussions, share perspectives, and learn from people building real products.",
  },
];

export default function HomePage() {
  return (
    <main className="flex-1">

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="mx-auto flex min-h-130 max-w-6xl items-center px-6 py-20">
          <div className="max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
              <span className="size-2 rounded-full bg-foreground" />
              A community for developers
            </div>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Ideas worth sharing.
              <br />
              <span className="text-muted-foreground">
                Knowledge worth discovering.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Devora is a place where developers share what they
              know, discover new ideas, and learn from each other.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/80"
              >
                Start writing
              </Link>

              <Link
                href="/dashboard"
                className="rounded-lg border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Explore posts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium text-muted-foreground">
              WHY DEVORA
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Built for people who build things.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Share what you learn, find useful knowledge, and
              become part of a developer community.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
            {features.map((feature) => (
              <Feature
                key={feature.title}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                LATEST POSTS
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                From the community
              </h2>

              <p className="mt-3 text-muted-foreground">
                Fresh ideas, experiences, and knowledge from developers.
              </p>
            </div>

            <Link
              href="/posts"
              className="hidden text-sm font-medium underline-offset-4 hover:underline sm:block"
            >
              View all
            </Link>
          </div>

          <PostList />
        </div>
      </section>



      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-2xl bg-black px-8 py-12 text-white sm:px-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Have something worth sharing?
              </h2>

              <p className="mt-4 leading-7 text-white/60">
                Create your account and start sharing your ideas
                with other developers.
              </p>

              <Link
                href="/register"
                className="mt-8 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Create an account
              </Link>
            </div>
          </div>
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
    <div className="bg-background p-7">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}