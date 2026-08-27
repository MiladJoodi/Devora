"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/lib/axios";
import {
    createCategorySchema,
    type CreateCategoryInput,
} from "@/validations/category";

export default function CreateCategoryForm() {
    const router = useRouter();
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateCategoryInput>({
        resolver: zodResolver(createCategorySchema),
    });

    async function onSubmit(data: CreateCategoryInput) {
        setError("");

        try {
            await api.post("/categories", data);

            router.refresh();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                    "Something went wrong.",
                );
            } else {
                setError("Something went wrong.");
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <div>
                <label className="text-sm font-medium">
                    Category name
                </label>

                <input
                    {...register("name")}
                    className="mt-2 w-full rounded-md border px-3 py-2"
                    placeholder="e.g. JavaScript"
                />

                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50 cursor-pointer"
            >
                {isSubmitting ? "Creating..." : "Create Category"}
            </button>
        </form>
    );
}