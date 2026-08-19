import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back
          </h1>

          <p className="mt-2 text-muted-foreground">
            Sign in to your account.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}