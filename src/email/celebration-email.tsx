import { eq } from "drizzle-orm";
import { db } from "@/db";
import { articles, users } from "@/db/schema";
import resend from "@/email";
import { CelebrationTemplate } from "@/email/templates";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:3000`;

export default async function sendCelebrationEmail(
  articleId: number,
  pageviews: number,
) {
  const response = await db
    .select({
      id: articles.authorId,
      email: users.email,
      title: articles.title,
      name: users.name,
    })
    .from(articles)
    .leftJoin(users, eq(articles.authorId, users.id))
    .where(eq(articles.id, articleId));

  const { email, id, name, title } = response[0];

  if (!email) {
    console.log(
      `X skipping celebration email for ${articleId} on pageviews ${pageviews}, could not find email in database`,
    );
    return;
  }

  // With custom domain
  // const emailRes = await resend.emails.send({
  //   from: "Wikimasters <noreply@email-domain>",
  //   to: email,
  //   subject: `Your article on Wikimasters got $pagevies`,
  //   html: "<h1>Congrats!</h1>",
  // });

  const emailRes = await resend.emails.send({
    from: "Wikimasters <onboarding@resend.dev>",
    to: "resend.party081@passmail.com",
    subject: `✨ Your article on Wikimasters got ${pageviews} views`,
    react: (
      <CelebrationTemplate
        articleTitle={title}
        articleUrl={`${BASE_URL}/wiki/${articleId}`}
        name={name ?? "Friend"}
        pageviews={pageviews}
      />
    ),
  });

  if (!emailRes.error) {
    console.log(
      `✉️ sent ${id} a celebration email for getting ${pageviews} on article ${articleId}`,
    );
  } else {
    console.log(
      `❌ error sending ${id} a celebration email fro getting ${pageviews} on article ${articleId}`,
    );
  }
}
