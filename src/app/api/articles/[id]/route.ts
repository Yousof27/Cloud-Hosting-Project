import { prisma } from "@/utils/db";

import { UpdateArticleDto, updateArticleSchema, zodErrorFormater } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface getSingleArticleProps {
  params: Promise<{ id: string }>;
}

/**
 * @method  GET
 * @route   ~/api/articles/:id
 * @desc    Get Single Article
 * @access  public
 */
export async function GET(request: NextRequest, { params }: getSingleArticleProps) {
  try {
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id: +id },
      include: {
        comments: {
          include: { user: { select: { username: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ message: "Article Not Found" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}

/**
 * @method  PUT
 * @route   ~/api/articles/:id
 * @desc    Update Article
 * @access  private (only admin)
 */
export async function PUT(request: NextRequest, { params }: getSingleArticleProps) {
  try {
    const { id } = await params;
    const article = await prisma.article.findUnique({ where: { id: +id } });

    if (!article) {
      return NextResponse.json({ message: "Article Not Found" }, { status: 404 });
    }

    const { isAdmin } = verifyToken(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Only Admin Can Update Articles, Forbidden !" }, { status: 403 });
    }

    const body = (await request.json()) as UpdateArticleDto;

    const validation = updateArticleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: zodErrorFormater(validation.error) }, { status: 400 });
    }

    const updatedArticle = await prisma.article.update({
      where: { id: +id },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json({ message: "Article Updated Successfully", updatedArticle }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}

/**
 * @method  DELETE
 * @route   ~/api/articles/:id
 * @desc    Delete Article
 * @access  private (only admin)
 */
export async function DELETE(request: NextRequest, { params }: getSingleArticleProps) {
  try {
    const { id } = await params;

    const article = await prisma.article.findUnique({ where: { id: +id }, include: { comments: true } });

    if (!article) {
      return NextResponse.json({ message: "Article Not Found !" }, { status: 404 });
    }

    const { isAdmin } = verifyToken(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Only Admin Can Delete Articles, Forbidden !" }, { status: 403 });
    }

    const commentsIds: number[] = article?.comments.map((comment) => comment.id);

    await prisma.article.delete({ where: { id: +id } });

    await prisma.comment.deleteMany({ where: { id: { in: commentsIds } } });

    return NextResponse.json({ message: "Article Deleted Successfully", deletedArticle: article }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}
