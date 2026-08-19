import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Create an account
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create your account to continue.
          </p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}