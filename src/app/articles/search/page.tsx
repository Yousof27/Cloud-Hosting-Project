import { getSearchArticles } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@prisma/client";
import React from "react";

interface ArticlesSearchPageProps {
  searchParams: Promise<{ searchText: string }>;
}

const ArticlesSearchPage = async ({ searchParams }: ArticlesSearchPageProps) => {
  const { searchText } = await searchParams;

  const { articles } = await getSearchArticles(searchText);

  const noArticles = articles.length === 0;

  console.log({ searchText, articles });
  return (
    <div className="fix-height container !m-auto !px-5">
      <h1 className="text-2xl font-bold !mb-7 !mt-7 text-gray-800">
        Search Text: <span className={`${noArticles ? "text-red-500" : "!ms-1 text-green-700 text-3xl font-bold"}`}>{searchText}</span>
      </h1>
      <div className="flex items-center justify-center flex-wrap gap-7 !mb-7">
        {noArticles ? (
          <h2 className="text-2xl">No Articles Matches Your Search !</h2>
        ) : (
          articles.map((item: Article) => <ArticleItem key={item.id} article={item} />)
        )}
      </div>
    </div>
  );
};

export default ArticlesSearchPage;
