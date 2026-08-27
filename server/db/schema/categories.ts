import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 100 }).notNull().unique(),

  slug: varchar("slug", { length: 120 }).notNull().unique(),

  isDefault: boolean("is_default").notNull().default(false),
});