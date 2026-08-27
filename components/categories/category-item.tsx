"use client";

import { useState } from "react";

import EditCategoryForm from "@/components/categories/edit-category-form";

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
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="rounded-lg border p-4">
      {!isEditing ? (
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">{name}</p>

            <p className="text-sm text-muted-foreground">
              {slug}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted cursor-pointer"
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          <EditCategoryForm
            id={id}
            name={name}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}
    </div>
  );
}