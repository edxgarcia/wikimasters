import { notFound, redirect } from "next/navigation";
import { WikiEditor } from "@/components/wiki-editor";
import { authorizeUserToEditArticle } from "@/db/authz";
import { auth } from "@/lib/auth/server";
import { getArticleById } from "@/server/data-access/articles";

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
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

  if (!canEdit) {
    redirect(`/wiki/${id}`);
  }

  return (
    <WikiEditor
      initialTitle={article.title}
      initialContent={article.content}
      isEditing={true}
      articleId={id}
    />
  );
}
