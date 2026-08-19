import { redirect } from "next/navigation";

import { getCurrentUser } from "./get-current-user";

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}