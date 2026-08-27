import { db } from "@/server/db";
import { categories } from "@/server/db/schema";

type CreateCategoryInput = {
  name: string;
  slug: string;
};

export async function createCategory(data: CreateCategoryInput) {
  const [category] = await db
    .insert(categories)
    .values(data)
    .returning();

  return category;
}