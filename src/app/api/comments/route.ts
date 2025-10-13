import { prisma } from "@/utils/db";
import { CreateCommentDto, createCommentSchema, zodErrorFormater } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method  POST
 * @route   ~/api/comments
 * @desc    Create New Comment
 * @access  private (Only Logged In User)
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateCommentDto;

    const validation = createCommentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: zodErrorFormater(validation.error) }, { status: 400 });
    }

    const { id } = verifyToken(request);

    const comment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: id,
      },
    });

    return NextResponse.json({ message: "New Comment", comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}

/**
 * @method  GET
 * @route   ~/api/comments
 * @desc    Get all Comments
 * @access  private (Only Admin can get comments)
 */

export async function GET(request: NextRequest) {
  try {
    const { isAdmin } = verifyToken(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Only Admin Can Get All Comments, Forbidden !" }, { status: 403 }); // Forbidden
    }

    const comments = await prisma.comment.findMany();

    return NextResponse.json({ message: "Get Comments Successfully", comments }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}
