"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    createPostSchema,
    type CreatePostInput,
} from "@/validations/post";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { useState } from "react";
import CategorySelect from "../categories/category-select";
import { getApiErrorMessage } from "@/lib/api-error";

export default function CreatePostForm() {

    const router = useRouter();

    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreatePostInput>({
        resolver: zodResolver(createPostSchema),
    });

    async function onSubmit(data: CreatePostInput) {
        setError("");

        try {
            const response = await api.post("/posts", data);

            router.push(`/posts/${response.data.post.slug}`);
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
                    placeholder="Enter post title"
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
                    placeholder="Write your post..."
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
                {isSubmitting ? "Creating..." : "Create Post"}
            </button>
        </form>
    );
}