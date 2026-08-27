import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { categories } from "@/server/db/schema";

type CreateCategoryInput = {
  name: string;
  slug: string;
};

export async function createCategory(data: CreateCategoryInput) {
  const existingCategory = await db.query.categories.findFirst({
    where: eq(categories.name, data.name),
  });

  if (existingCategory) {
    throw new Error("CATEGORY_ALREADY_EXISTS");
  }

  const [category] = await db
    .insert(categories)
    .values(data)
    .returning();

  return category;
}