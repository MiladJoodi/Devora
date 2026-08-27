import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { categories, posts } from "@/server/db/schema";

export async function deleteCategory(id: string) {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, id),
  });

  if (!category) {
    return null;
  }

  if (category.isDefault) {
    throw new Error("DEFAULT_CATEGORY_CANNOT_BE_DELETED");
  }

  const defaultCategory = await db.query.categories.findFirst({
    where: eq(categories.isDefault, true),
  });

  if (!defaultCategory) {
    throw new Error("DEFAULT_CATEGORY_NOT_FOUND");
  }

  await db
    .update(posts)
    .set({
      categoryId: defaultCategory.id,
    })
    .where(eq(posts.categoryId, id));

  const [deletedCategory] = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning();

  return deletedCategory;
}