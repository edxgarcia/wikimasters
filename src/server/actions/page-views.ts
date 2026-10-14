"use server";

import redis from "@/cache";
import sendCelebrationEmail from "@/email/celebration-email";

const milestones = [10, 50, 100, 10_000];

const keyFor = (id: number) => `pageviews:article-${id}`;

export async function incrementPageview(articleId: number) {
  const articleKey = keyFor(articleId);
  const newValue = await redis.incr(articleKey);

  if (milestones.includes(newValue)) {
    sendCelebrationEmail(articleId, newValue);
  }

  return Number(newValue);
}
