import { WikiCard } from "@/components/wiki-card";
import { getArticles } from "@/server/data-access/articles";

export default async function Home() {
  const articles = await getArticles();
  return (
    <div>
      <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
        {articles.map(({ title, author, createdAt, id, summary }) => (
          <WikiCard
            key={id}
            title={title}
            author={author ? author : "Unknown"}
            date={createdAt}
            summary={summary ?? "Summary not done yet."}
            href={`/wiki/${id}`}
          />
        ))}
      </main>
    </div>
  );
}
