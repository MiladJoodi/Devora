"use client";

import { useEffect, useState } from "react";
import type {
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";

import { api } from "@/lib/axios";

type Category = {
    id: string;
    name: string;
};

type CategorySelectProps<T extends FieldValues> = {
    register: UseFormRegister<T>;
    error?: string;
    defaultValue?: string;
};

export default function CategorySelect<
    T extends FieldValues
>({
    register,
    error,
    defaultValue = "",
}: CategorySelectProps<T>) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");

    useEffect(() => {
        async function fetchCategories() {
            try {
                setFetchError("");

                const response = await api.get<Category[]>(
                    "/categories"
                );

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
                    {...register("categoryId" as Path<T>)}
                    defaultValue={defaultValue}
                    className="mt-2 w-full rounded-md border px-3 py-2"
                >
                    <option value="" disabled>
                        Select a category
                    </option>

                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
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