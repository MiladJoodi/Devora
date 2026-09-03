"use client";

import { useRouter } from "next/navigation";

import DeleteButton from "@/components/ui/delete-button";
import { api } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/api-error";

type PostActionsProps = {
  slug: string;
  title: string;
};

export default function PostActions({
  slug,
  title,
}: PostActionsProps) {
  const router = useRouter();

  async function handleDelete() {
    try {
      await api.delete(`/posts/${slug}`);

      router.refresh();
    } catch (error) {
      alert(getApiErrorMessage(error));
    }
  }

  return (
    <DeleteButton
      onDelete={handleDelete}
      confirmationMessage={`Are you sure you want to delete "${title}"?`}
    />
  );
}