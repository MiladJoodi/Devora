import CreatePostForm from "@/components/posts/create-post-form";

export default function NewPostPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-medium text-muted-foreground">
          DASHBOARD
        </p>

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