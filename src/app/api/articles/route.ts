import { CreateArticleDto, createArticleSchema, zodErrorFormater } from "@/utils/validationSchema";
import { Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { PAGE_LIMIT } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";

/**
 * @method  GET
 * @route   ~/api/articles
 * @desc    Get Articles By Page Number
 * @access  public
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    const articles = await prisma.article.findMany({
      skip: (+pageNumber - 1) * PAGE_LIMIT,
      take: PAGE_LIMIT,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}

/**
 * @method  POST
 * @route   ~/api/articles
 * @desc    Create New Article
 * @access  private
 */
export async function POST(request: NextRequest) {
  try {
    const { isAdmin } = verifyToken(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Only Admin Can Create A New Article, Forbidden !" }, { status: 403 }); // Forbidden
    }

    const body = (await request.json()) as CreateArticleDto;

    const validation = createArticleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: zodErrorFormater(validation.error) }, { status: 400 });
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json({ message: "Article created successfully", article: newArticle }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}
