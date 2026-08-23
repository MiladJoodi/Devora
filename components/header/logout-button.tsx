"use client";

import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await api.post("/auth/logout");

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-md border px-3 py-2 text-sm transition hover:bg-gray-100 cursor-pointer"
    >
      Logout
    </button>
  );
}