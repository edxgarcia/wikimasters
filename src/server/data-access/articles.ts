import { eq } from "drizzle-orm";
import { db } from "@/db";
import { articles, users } from "@/db/schema";

export async function getArticles() {
  const articlesData = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: users.name,
    })
    .from(articles)
    .leftJoin(users, eq(articles.authorId, users.id));

  return articlesData;
}

export async function getArticleById(id: number) {
  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: users.name,
      imageUrl: articles.imageUrl,
    })
    .from(articles)
    .leftJoin(users, eq(articles.authorId, users.id))
    .where(eq(articles.id, id));

  return response[0] ? response[0] : null;
}
