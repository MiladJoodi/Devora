import { getCategories } from "@/server/services/categories/get-categories";
import CreateCategoryForm from "@/components/categories/create-category-form";

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
            <div>
                <p className="text-sm font-medium text-muted-foreground">
                    DASHBOARD
                </p>

                <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                    Categories
                </h1>

                <p className="mt-4 text-muted-foreground">
                    Manage the categories used for your posts.
                </p>
            </div>

            <div className="mb-10 rounded-xl border p-6">
                <h2 className="text-xl font-semibold">
                    Create Category
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Add a new category for your posts.
                </p>

                <div className="mt-6">
                    <CreateCategoryForm />
                </div>
            </div>

            <div className="mt-10">
                {categories.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No categories yet.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex items-center justify-between rounded-lg border p-4"
                            >
                                <div>
                                    <p className="font-medium">{category.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {category.slug}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}