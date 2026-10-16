import { notFound } from "next/navigation";
import WikiArticleViewer from "@/components/wiki-article-viewer";
import { authorizeUserToEditArticle } from "@/db/authz";
import { auth } from "@/lib/auth/server";
import { getArticleById } from "@/server/data-access/articles";

interface ViewArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ViewArticlePage({
  params,
}: ViewArticlePageProps) {
  const { id } = await params;
  const article = await getArticleById(Number(id));
  const session = await auth.getSession();
  const userId = session.data?.user.id;

  let canEdit = false;

  if (userId) {
    canEdit = await authorizeUserToEditArticle(userId, Number(id));
  }

  if (!article) {
    notFound();
  }

  return <WikiArticleViewer article={article} canEdit={canEdit} />;
}
