import {
    pgTable,
    uuid,
    text,
    timestamp,
  } from "drizzle-orm/pg-core";
  
  import { users } from "./users";
  import { posts } from "./posts";
  
  export const comments = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
  
    content: text("content").notNull(),
  
    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id),
  
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
  
    parentId: uuid("parent_id"),
  
    createdAt: timestamp("created_at").defaultNow().notNull(),
  
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });