import {
  boolean,
  pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const neonAuth = pgSchema("neon_auth");

export const users = neonAuth.table("user", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  published: boolean().notNull(),
  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

const schema = { articles, users };
export default schema;

export type ArticleInsert = typeof articles.$inferInsert;
export type NewArticle = typeof articles.$inferInsert;
export type UsersSelect = typeof users.$inferSelect;
