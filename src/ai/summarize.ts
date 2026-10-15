import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: "http://localhost:1234/v1",
});

export async function summarizeArticle(title: string, article: string) {
  if (!article || !article.trim()) {
    throw new Error("Article content is required to generate a summary");
  }

  const prompt = `Summarize the following wiki article in 1-2 concise sentences. Focus on the main idea and the most important details a reader should remember. Do not add opinions or unrelated information. The point is that readers can see the summary a glance and decide if they want to read more.\n\nTitle:\n${title}\n\nArticle:\n${article}`;

  const { text } = await generateText({
    // model: "openai/gpt-5-nano",
    model: lmstudio("qwen2.5-coder-7b-instruct"),
    instructions: "You are an assistant that writes concise factual summaries.",
    prompt,
  });

  console.log("🤖 Summarize by AI", text);

  return (text ?? "").trim();
}
