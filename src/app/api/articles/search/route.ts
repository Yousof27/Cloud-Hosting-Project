import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

/**
 * @method  GET
 * @route   ~/api/articles/search?searchText=value
 * @desc    Get Articles By Search Text
 * @access  public
 */

export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");

    let articles = [];

    if (searchText) {
      articles = await prisma.article.findMany({
        where: { title: { contains: searchText, mode: "insensitive" } },
      });
    } else {
      articles = await prisma.article.findMany({ skip: 0, take: 6 });
    }

    if (articles.length === 0) {
      return NextResponse.json({ message: "No Result Found !" }, { status: 404 });
    }

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}
