"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/api-error";
import {
    createCategorySchema,
    type CreateCategoryInput,
} from "@/validations/category";

type EditCategoryFormProps = {
    id: string;
    name: string;
    onCancel: () => void;
};

export default function EditCategoryForm({
    id,
    name,
    onCancel,
}: EditCategoryFormProps) {
    const router = useRouter();

    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateCategoryInput>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name,
        },
    });

    async function onSubmit(data: CreateCategoryInput) {
        setError("");

        try {
            await api.patch(`/categories/${id}`, data);

            router.refresh();
            onCancel();
        } catch (error) {
            setError(getApiErrorMessage(error));
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

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50 cursor-pointer"
                >
                    {isSubmitting ? "Updating..." : "Update Category"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border px-5 py-2.5 text-sm font-medium cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}