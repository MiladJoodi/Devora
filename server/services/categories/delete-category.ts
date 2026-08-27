import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { categories } from "@/server/db/schema";

export async function deleteCategory(id: string) {
  const [category] = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning();

  return category;
}