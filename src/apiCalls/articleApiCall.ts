import { Article } from "@prisma/client";
import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";

// Get Articles Based by Page Number
export async function getArticles(pageNumber: number | undefined): Promise<Article[]> {
  const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`, { cache: "no-store" });

  if (!response.ok) throw new Error("Failed to fetch articles :(");

  return response.json();
}

// Get Articles Based by searchText
export async function getSearchArticles(searchText: string): Promise<{ articles: Article[] }> {
  const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`);

  if (response.status === 404) return { articles: [] };
  else if (!response.ok) throw new Error("Failed to fetch articles :(");

  return response.json();
}

// Get Single Article by id
export async function getSingleArticle(id: string): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${id}`);
  const body = await response.json();

  if (!response.ok) throw new Error(body.message);

  return body;
}

// Get Articles Number
export async function getArticlesNumber(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`, { next: { revalidate: 50 } });

  if (!response.ok) throw new Error("Failed to fetch articles number :(");

  const { count } = (await response.json()) as { count: number };

  return count;
}
