"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import CategorySelect from "@/components/categories/category-select";
import { api } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/api-error";
import {
    updatePostSchema,
    type UpdatePostInput,
} from "@/validations/post";

type EditPostFormProps = {
    slug: string;
    title: string;
    content: string;
    categoryId: string;
};

export default function EditPostForm({
    slug,
    title,
    content,
    categoryId,
}: EditPostFormProps) {
    const router = useRouter();

    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UpdatePostInput>({
        resolver: zodResolver(updatePostSchema),
        defaultValues: {
            title,
            content,
            categoryId,
        },
    });

    async function onSubmit(data: UpdatePostInput) {
        setError("");

        try {
            await api.patch(`/posts/${slug}`, data);

            router.refresh();
        } catch (error) {
            setError(getApiErrorMessage(error));
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="text-sm font-medium">Title</label>

                <input
                    {...register("title")}
                    className="mt-2 w-full rounded-md border px-3 py-2"
                />

                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">Content</label>

                <textarea
                    {...register("content")}
                    className="mt-2 min-h-60 w-full rounded-md border px-3 py-2"
                />

                {errors.content && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.content.message}
                    </p>
                )}
            </div>

            <CategorySelect
                register={register}
                error={errors.categoryId?.message}
                defaultValue={categoryId}
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
                {isSubmitting ? "Updating..." : "Update Post"}
            </button>
        </form>
    );
}