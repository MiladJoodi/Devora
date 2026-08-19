import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 50 }).notNull().unique(),

  slug: varchar("slug", { length: 60 }).notNull().unique(),
});