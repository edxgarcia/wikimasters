import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: "http://localhost:1234/v1",
});

export async function generateArticleTitle(content: string) {
  if (!content || !content.trim()) {
    throw new Error("❌ The content is required");
  }

  const prompt = `
Read the article below and generate a short, sharp, and genuinely funny title. Follow these rules:
  • Keep it under 10 words
  • Capture the core idea or most relatable/surprising point
  • Use clever wordplay, dry humor, or a light twist—avoid clickbait, forced puns, or jokes that miss the point
  • Match the article’s general tone while keeping it publication-ready
Output only the title. Do not add explanations, quotes, or extra text.

<article>
${content}
<article/>
`;

  const { text } = await generateText({
    model: lmstudio("qwen3.6-35b-a3b-mtp"),
    instructions: "You are a witty headline editor.",
    prompt,
  });

  return (text ?? "My article").trim();
}
