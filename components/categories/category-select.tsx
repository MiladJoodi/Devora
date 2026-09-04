"use client";

import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";

import { api } from "@/lib/axios";
import { CreatePostInput } from "@/validations/post";

type Category = {
    id: string;
    name: string;
};

type CategorySelectProps = {
    register: UseFormRegister<CreatePostInput>;
    error?: string;
    defaultValue?: string;
};

export default function CategorySelect({
    register,
    error,
    defaultValue = "",
}: CategorySelectProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");

    useEffect(() => {
        async function fetchCategories() {
            try {
                setFetchError("");

                const response = await api.get<Category[]>("/categories");

                setCategories(response.data);
            } catch {
                setFetchError("Could not load categories.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCategories();
    }, []);

    return (
        <div>
            <label className="text-sm font-medium">
                Category
            </label>

            {isLoading ? (
                <p className="mt-2 text-sm text-muted-foreground">
                    Loading categories...
                </p>
            ) : fetchError ? (
                <p className="mt-2 text-sm text-red-500">
                    {fetchError}
                </p>
            ) : (
                <select
                    {...register("categoryId")}
                    defaultValue={defaultValue}
                    className="mt-2 w-full rounded-md border px-3 py-2"
                >
                    <option value="" disabled>
                        Select a category
                    </option>

                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}