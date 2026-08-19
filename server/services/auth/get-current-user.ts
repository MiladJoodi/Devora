import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { verifyAuthToken } from "@/server/lib/auth";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const { userId } = await verifyAuthToken(token);

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch {
    return null;
  }
}