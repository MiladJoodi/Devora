import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { categories } from "@/server/db/schema";

type UpdateCategoryInput = {
  id: string;
  name: string;
  slug: string;
};

export async function updateCategory({
  id,
  name,
  slug,
}: UpdateCategoryInput) {
  const existingCategory = await db.query.categories.findFirst({
    where: eq(categories.name, name),
  });

  if (existingCategory && existingCategory.id !== id) {
    throw new Error("CATEGORY_ALREADY_EXISTS");
  }

  const [category] = await db
    .update(categories)
    .set({
      name,
      slug,
    })
    .where(eq(categories.id, id))
    .returning();

  return category;
}