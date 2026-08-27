"use client";

import { useState } from "react";

type DeleteButtonProps = {
  onDelete: () => Promise<void>;
  confirmationMessage?: string;
  disabled?: boolean;
  className?: string;
};

export default function DeleteButton({
  onDelete,
  confirmationMessage = "Are you sure you want to delete this?",
  disabled = false,
  className = "",
}: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(confirmationMessage);

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={disabled || isDeleting}
      className={`cursor-pointer rounded-md border px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-50 ${className}`}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}