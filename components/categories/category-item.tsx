"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import EditCategoryForm from "@/components/categories/edit-category-form";
import DeleteButton from "@/components/ui/delete-button";
import { api } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/api-error";

type CategoryItemProps = {
  id: string;
  name: string;
  slug: string;
};

export default function CategoryItem({
  id,
  name,
  slug,
}: CategoryItemProps) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setError("");

    try {
      await api.delete(`/categories/${id}`);

      router.refresh();
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  }

  return (
    <div className="rounded-lg border p-4">
      {!isEditing ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">{name}</p>

              <p className="text-sm text-muted-foreground">
                {slug}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted"
              >
                Edit
              </button>

              <DeleteButton
                onDelete={handleDelete}
                confirmationMessage={`Are you sure you want to delete "${name}"?`}
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-500">
              {error}
            </p>
          )}
        </>
      ) : (
        <EditCategoryForm
          id={id}
          name={name}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}