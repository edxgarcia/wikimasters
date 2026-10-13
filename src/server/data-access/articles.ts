import { eq } from "drizzle-orm";
import redis from "@/cache";
import { db } from "@/db";
import { articles, users } from "@/db/schema";

type ArticlesView = {
  title: string;
  id: number;
  createdAt: string;
  content: string;
  author: string | null;
}[];

export async function getArticles(): Promise<ArticlesView> {
  const cached = await redis.get("articles:all");

  if (cached) {
    console.log("Get Articles Cache Hit!");
    return cached as ArticlesView;
  }

  console.log("Get Articles Cache Miss!");

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

  redis.set("articles:all", articlesData, {
    ex: 60,
  });

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
