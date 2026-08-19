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
        </div>
      </div>
    </main>
  );
}