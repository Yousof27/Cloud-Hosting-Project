import { getArticles } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { Article } from "@prisma/client";
import { PAGE_LIMIT } from "@/utils/constants";
import { Metadata } from "next";
import { prisma } from "@/utils/db";

interface ArticlesPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  const { pageNumber } = await searchParams;

  const articles: Article[] = await getArticles(+pageNumber);

  const articlesNumber: number = await prisma.article.count();

  const pages = Math.ceil(articlesNumber / PAGE_LIMIT);

  return (
    <section className="fix-height container !m-auto !p-5">
      <SearchArticleInput />
      <div className="flex justify-center flex-wrap gap-7">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination pageNumber={+pageNumber} pages={pages} route="/articles" />
    </section>
  );
};

export default ArticlesPage;

export const metadata: Metadata = {
  title: "Articles",
  description: "This is the articles page",
};
