import { relations } from "drizzle-orm";
import { users } from "./users";
import { posts } from "./posts";
import { categories } from "./categories";
import { tags } from "./tags";
import { postTags } from "./post-tags";
import { comments } from "./comments";

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),

  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),

  postTags: many(postTags),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),

  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
    author: one(users, {
      fields: [comments.authorId],
      references: [users.id],
    }),
  
    post: one(posts, {
      fields: [comments.postId],
      references: [posts.id],
    }),
  
    parent: one(comments, {
      fields: [comments.parentId],
      references: [comments.id],
      relationName: "commentReplies",
    }),
  
    replies: many(comments, {
      relationName: "commentReplies",
    }),
  }));
