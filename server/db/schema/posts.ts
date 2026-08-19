import { users } from "./users";
import { categories } from "./categories";
import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
    id: uuid("id").defaultRandom().primaryKey(),

    title: varchar("title", { length: 200 }).notNull(),

    slug: varchar("slug", { length: 220 }).notNull().unique(),

    excerpt: text("excerpt"),

    content: text("content").notNull(),

    coverImage: text("cover_image"),

    status: varchar("status", { length: 20 }).notNull().default("draft"),

    publishedAt: timestamp("published_at"),

    authorId: uuid("author_id")
        .notNull()
        .references(() => users.id),

    categoryId: uuid("category_id")
        .notNull()
        .references(() => categories.id),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});