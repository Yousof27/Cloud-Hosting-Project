import { Article } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <div className="!p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 transition-all hover:bg-slate-200 w-full md:w-2/5 lg:w-1/4 flex flex-col gap-3">
      <h3 className="text-xl font-bold text-gray-900">{article.title}</h3>
      <p className="my-2 text-xl text-gray-700 !p-1 line-clamp-1 flex-1">{article.description}</p>
      <Link
        href={`/articles/${article.id}`}
        className="text-xl bg-purple-700 transition-all hover:bg-purple-800 w-full block text-center !p-1 text-white rounded-lg"
      >
        Read More
      </Link>
    </div>
  );
};

export default ArticleItem;
