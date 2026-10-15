import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { generateArticleTitle } from "@/ai/generate-titles";
import redis from "@/cache";
import { db } from "@/db";
import { articles } from "@/db/schema";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const articlesData = await db
    .select({ id: articles.id, content: articles.content })
    .from(articles);

  if (articlesData.length === 0) {
    return NextResponse.json({ ok: true, updated: 0 });
  }

  console.log("🤖 Generating titles with AI...");

  let updated = 0;

  for (const { id, content } of articlesData) {
    try {
      const generatedTitle = await generateArticleTitle(content);
      await db
        .update(articles)
        .set({ title: generatedTitle })
        .where(eq(articles.id, id));
      console.log(
        `✅ Title generated successfully, articleId = ${id}`,
        generatedTitle,
      );
      updated++;
    } catch (error) {
      console.error(`❌ Failed to generate title, articleId = ${id}`, error);
    }
  }

  if (updated > 0) {
    // Clear articles cache used by getArticles
    try {
      await redis.del("articles:all");
    } catch (error) {
      console.error(`⚠️ Failed to clear articles cache`, error);
    }
  }

  console.log(`🤖 Concluding AI generated titles, ${updated} articles updated`);
  return NextResponse.json({ ok: true, updated });
}
