import { db } from "@/server/db";
import { categories } from "@/server/db/schema";

export async function getCategories() {
  return db.select().from(categories);
}