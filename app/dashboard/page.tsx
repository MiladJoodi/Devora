import { requireUser } from "@/server/services/auth/require-user";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
    </main>
  );
}